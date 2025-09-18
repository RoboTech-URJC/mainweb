#!/bin/bash
set -e

BASE_DIR="$(pwd)/escape_room"
TMP_DIR="$BASE_DIR/tmp"

echo "===> Creando escape room en $BASE_DIR..."
rm -rf "$BASE_DIR"
mkdir -p "$BASE_DIR" "$TMP_DIR"

#################################
# Función para generar unlock.sh
#################################
crear_unlock() {
    reto_num="$1"
    clave="$2"
    siguiente="$3"
    mkdir -p "$BASE_DIR/reto${reto_num}"
    cat > "$BASE_DIR/reto${reto_num}/unlock.sh" <<EOF
#!/bin/bash
read -p "Introduce la clave para desbloquear el siguiente reto: " entrada
if [[ "\$entrada" == "$clave" ]]; then
    echo "✅ Correcto, desbloqueando reto $siguiente..."

    if [ "$siguiente" == "reto3" ]; then
        echo ""
        #################################
        # Reto 3 - Archivo sin permisos
        #################################
        mkdir -p "$TMP_DIR/reto3"
        echo "CLAVE=merge" > "$TMP_DIR/reto3/siguiente.txt"
        chmod 000 "$TMP_DIR/reto3/siguiente.txt"

        cat > "$TMP_DIR/reto3/README.txt" <<EOT
🔒 Reto 3 - El Archivo Prohibido

El archivo con la clave ha sido bloqueado por el sistema.  
Necesitarás encontrar la forma de **leerlo** y así avanzar en la recuperación de tus créditos RAC.
Pista: puede que los permisos tengan algo que ver... 🤔
EOT

        mv "$TMP_DIR/reto3" "$BASE_DIR/reto3"

        # Generar manualmente el unlock.sh de reto 3
        mkdir -p "$BASE_DIR/reto3"
        cat > "$BASE_DIR/reto3/unlock.sh" <<EOT2
#!/bin/bash
read -p "Introduce la clave para desbloquear el siguiente reto: " entrada
if [[ "\$entrada" == "merge" ]]; then
    echo "✅ Correcto, desbloqueando reto reto4..."
    unzip -o "$BASE_DIR/reto4.zip" -d "$BASE_DIR" >/dev/null
else
    echo "❌ Clave incorrecta."
fi
EOT2
        chmod +x "$BASE_DIR/reto3/unlock.sh"

    elif [ "$siguiente" == "reto6" ]; then
        echo ""
        echo "🎉 ¡Has completado todos los retos de la terminal! Ahora, la misión final:"
        echo "----------------------------------------------------------------------"
        cat "$BASE_DIR/reto6/README.txt"
        echo "----------------------------------------------------------------------"
    else
        unzip -o "$BASE_DIR/${siguiente}.zip" -d "$BASE_DIR" >/dev/null
    fi
else
    echo "❌ Clave incorrecta."
fi
EOF
    chmod +x "$BASE_DIR/reto${reto_num}/unlock.sh"
}

#################################
# Reto 0 - Inicio
#################################
mkdir -p "$TMP_DIR/reto0"
cat > "$TMP_DIR/reto0/README.txt" <<EOT
🏫 Asociación de estudiantes RoboTech
🔎 Misión: Tus créditos RAC han desaparecido del sistema universitario.

Un fallo en los servidores ha corrompido tu expediente.  
Para empezar la misión, introduce la clave inicial que te entregaron al inicio del taller.
EOT
(cd "$TMP_DIR" && zip -r "$BASE_DIR/reto0.zip" reto0 >/dev/null)
rm -rf "$TMP_DIR/reto0"
crear_unlock 0 "init" "reto1"

#################################
# Reto 1 - Carpeta oculta
#################################
mkdir -p "$TMP_DIR/reto1/.backup"
echo "CLAVE=compilar" > "$TMP_DIR/reto1/.backup/pista.txt"
cat > "$TMP_DIR/reto1/README.txt" <<EOT
📂 Reto 1 - El Respaldo Oculto

Tu expediente puede estar escondido en un directorio oculto del sistema.  
Usa comandos de Linux para descubrir archivos y carpetas “invisibles”.
EOT
(cd "$TMP_DIR" && zip -r "$BASE_DIR/reto1.zip" reto1 >/dev/null)
rm -rf "$TMP_DIR/reto1"
crear_unlock 1 "compilar" "reto2"

#################################
# Reto 2 - Buscar en logs
#################################
mkdir -p "$TMP_DIR/reto2/logs"
for i in {1..20}; do
    head -c 60 /dev/urandom | base64 > "$TMP_DIR/reto2/logs/log$i.txt"
done
echo "token / Token / TOKEN=fork" >> "$TMP_DIR/reto2/logs/log7.txt"
cat > "$TMP_DIR/reto2/README.txt" <<EOT
📝 Reto 2 - El Rastro en los Logs

El sistema generó numerosos registros tras el fallo.  
Entre ellos se esconde un token que desbloqueará el siguiente paquete.  
Usa comandos de búsqueda para filtrarlo y encontrar el token.
EOT
(cd "$TMP_DIR" && zip -r "$BASE_DIR/reto2.zip" reto2 >/dev/null)
rm -rf "$TMP_DIR/reto2"
crear_unlock 2 "fork" "reto3"

#################################
# Reto 4 - Git básico
#################################
mkdir -p "$TMP_DIR/reto4"
cd "$TMP_DIR/reto4"
git init -b master -q
echo "CLAVE=debug" > pista.txt
git add pista.txt
git commit -m "Añadir pista" -q
rm pista.txt
git commit -am "Eliminar pista" -q
cat > README.txt <<EOT
📜 Reto 4 - Historia Borrada

Parte de tu expediente estaba en un commit anterior que fue eliminado.  
Usa Git para recuperar la información perdida y encontrar la clave que desbloquea el siguiente reto.
EOT
cd "$TMP_DIR"
zip -r "$BASE_DIR/reto4.zip" reto4 >/dev/null
rm -rf "$TMP_DIR/reto4"
crear_unlock 4 "debug" "reto5"

#################################
# Reto 5 - Git avanzado con ramas
#################################
mkdir -p "$TMP_DIR/reto5"
cd "$TMP_DIR/reto5"
git init -b master -q

# Rama master con primera parte de la clave
echo "CLAVE_PARTE1=commit" > clave.txt
git add clave.txt
git commit -m "commit: Primera parte de la clave" -q

# Crear rama dev y añadir segunda parte
git checkout -b dev -q
echo "CLAVE_PARTE2=Hash" >> clave.txt
git commit -am "hash: Segunda parte de la clave" -q

# Volver a master
git checkout master -q

cat > README.txt <<EOT
💾 Reto 5 - El Historial Escondido en Ramas

La clave final está dividida en dos partes:  
- La primera parte está en la rama \`master\`.  
- La segunda parte está en otra rama oculta.

Usa comandos de Git para descubrir las ramas, cambiarte a la correcta y encontrar la segunda parte.  
Pista: La clave es la concatenación de las dos partes, sin espacios.
EOT

cd "$TMP_DIR"
zip -r "$BASE_DIR/reto5.zip" reto5 >/dev/null
rm -rf "$TMP_DIR/reto5"
crear_unlock 5 "commitHash" "reto6"

#################################
# Reto 6 - Misión Final (GitHub)
#################################
mkdir -p "$BASE_DIR/reto6"
cat > "$BASE_DIR/reto6/README.txt" <<'EOT'
🏆 Reto Final - Créditos Recuperados

¡La última misión tiene parte fuera de la terminal! Para demostrar que has recuperado tus créditos, debes:

1. Crear un **repositorio público** en tu cuenta de GitHub.
2. En la terminal, crea un archivo llamado **mail.txt** dentro de ese repositorio.
3. El archivo `mail.txt` debe contener tu dirección de correo electrónico.
4. Sube el archivo a tu repositorio (commit, push ...) y envía el **link del repositorio** a través de este formulario para confirmar la recuperación.

👉 Formulario de confirmación: https://forms.office.com/e/DtCQiq26r1
EOT

rm -rf "$TMP_DIR"

echo "✅ Escape room creado con éxito."
echo "Para empezar: ./escape_room/reto0/unlock.sh"
