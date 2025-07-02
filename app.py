from flask import Flask
from flask import render_template

from flask import  render_template, request, redirect, url_for,jsonify
from werkzeug.utils import secure_filename
import os,mysql.connector
    

app=Flask(__name__)


UPLOAD_FOLDER = 'img'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.route('/')
def mostrar_index():
    return render_template('index.html')

@app.route('/historia')
def mostrar_historia():
    return render_template('nuestraHistoria.html')

@app.route('/productos')
def mostrar_productos():
    return render_template('nuestrosProductos.html')

@app.route('/tienda')
def mostrar_tienda():
    return render_template('tienda.html')

@app.route('/sucursales')
def mostrar_sucursales():
    return render_template('sucursales.html')





@app.route('/postulacion', methods=['POST', 'GET'])
def mostrar_formulario():
    if request.method == 'POST':
        return guardar_postulacion()
    return render_template('postulacion.html')

'''def formulario_postulacion():
    if request.method == 'POST':
       
        return jsonify({'msg': 'Postulación guardada'})
    else:
        return render_template('postulacion.html')'''




def guardar_postulacion():
    nombre = request.form.get('nombre', '') 
    apellido = request.form.get('apellido', '')
    genero = request.form.get('genero', '')
    telefono = request.form.get('telefono', '')
    mail = request.form.get('mail', '')
    solicitud = request.form.get('solicitud', '')

    archivo = request.files.get('myfile')
    archivo_nombre = ''
    if archivo and archivo.filename.endswith(('.pdf', '.jpg', '.jpeg')):
        archivo_nombre = secure_filename(archivo.filename)
        archivo.save(os.path.join(app.config['UPLOAD_FOLDER'], archivo_nombre))
    else:
        return "Archivo no permitido", 400
    print("Datos recibidos:")
    print(nombre, apellido, genero, telefono, mail, solicitud, archivo_nombre)
    # Guardar en DB
    try:
        conn = mysql.connector.connect(
            host='localhost',
            port=3306,
            user='root',
            password='root',
            database='nono_ravioli'
        )
        cur = conn.cursor()
        cur.execute("""
            INSERT INTO postulacion (nombre, apellido, genero, telefono, mail, solicitud,archivo)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (nombre, apellido, genero, telefono, mail, solicitud,archivo_nombre))
        conn.commit()
        cur.close()
        conn.close()
        print("Postulación guardada con éxito")
        return render_template('postulacionOk.html')
    except mysql.connector.Error as err:
        print("Error al insertar:", err)
        return f"Ocurrió un error con la base de datos: {err}"







# @app.route('/subir_producto', methods=['POST'])
# def subir_producto():
 
   

if __name__=='__main__':
    app.run(debug=False)

