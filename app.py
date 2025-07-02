from flask import Flask
from flask import render_template
from flask_mysqldb import MySQL 

from flask import  render_template, request, redirect, url_for,jsonify
from werkzeug.utils import secure_filename
import os,mysql.connector
    

app=Flask(__name__)


UPLOAD_FOLDER = 'img'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)






@app.route('/')
def index():
    

    return render_template('index.html')


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
    
    
    conn = mysql.connector.connect(
        host='localhost',
        user='root',
        password='root',
        database='nono_ravioli')
    cur = conn.cursor()
    cur.execute("""
        INSERT INTO postulacion (nombre, apellido, genero, telefono, mail, texto)
        VALUES (%s, %s, %s, %s, %s, %s)
    """, (nombre, apellido, genero, telefono, mail, solicitud))
    conn.commit()
    cur.close()
    conn.close()
    return render_template('postulacionOk.html')











@app.route('/tienda')
def tienda():
    
    return render_template('tienda.html')


# @app.route('/subir_producto', methods=['POST'])
# def subir_producto():
 
   


if __name__=='__main__':
    app.run(debug=True)

