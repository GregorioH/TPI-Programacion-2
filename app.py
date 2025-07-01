from flask import Flask
from flask import render_template
from flask_mysqldb import MySQL 

from flask import  render_template, request, redirect, url_for,jsonify
from werkzeug.utils import secure_filename
import os

app=Flask(__name__)

mysql=MySQL()
app.config['MySQL_DATABASE_HOST']='localhost'
app.config['MySQL_DATABASE_USER']='root'
app.config['MySQL_DATABASE_PASSWORD']='localhost'
app.config['MySQL_DATABASE_DB']='sistema'
mysql.init_app(app)


UPLOAD_FOLDER = 'img'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)






@app.route('/')
def index():

    sql=""
    conn=mysql.connect()
    cursor=conn.cursor()
    cursor.execute(sql)
    conn.commit()
    return render_template('index.html')


@app.route('/postulacion', methods=['POST'])

def mostrar_formulario():
    return render_template('postulacion.html')

def formulario_postulacion():
    if request.method == 'POST':
       
        return jsonify({'msg': 'Postulación guardada'})
    else:
        return render_template('postulacion.html')
    

def guardar_postulacion():
    nombre = request.form['nombre'] 
    apellido = request.form['apellido']
    genero = request.form['genero']
    metodo = request.form.get('metodoContacto')
    telefono = request.form.get('telefono', '')
    mail = request.form.get('mail', '')
    solicitud = request.form.get('solicitud', '')

    archivo = request.files.get('myfile')
    archivo_nombre = ''
    if archivo:
        archivo_nombre = secure_filename(archivo.filename)
        archivo.save(os.path.join(app.config['UPLOAD_FOLDER'], archivo_nombre))

    conn = mysql.connect()

    cur = conn.cursor()
    cur.execute("""
        INSERT INTO postulaciones (nombre, apellido, genero, metodo_contacto, telefono, mail, solicitud, cv_nombre_archivo)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    """, (nombre, apellido, genero, metodo, telefono, mail, solicitud, archivo_nombre))
    conn.commit()
    cur.close()
    conn.close()

    return jsonify({'status': 'ok', 'msg': 'Postulación guardada'})

@app.route('/tienda')
def tienda():
    
    return render_template('tienda.html')


@app.route('/subir_producto', methods=['POST'])
def subir_producto():

   





    if __name__=='__main__':
     app.run(debug=True)


