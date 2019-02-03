# define imports
from flask import Flask
from flask import render_template



app = Flask(__name__)


@app.route("/066")
def page_066():
    return render_template('066.html')

@app.route("/065")
def page_065():
    return render_template('065.html')

@app.route("/064")
def page_064():
    return render_template('064.html')

@app.route("/063")
def page_063():
    return render_template('063.html')

@app.route("/020")
def page_020():
    return render_template('020.html')

@app.route("/")
def homepage():
    return render_template('index.html')

@app.route("/01.html")
def page_01():
    return render_template('01.html')

@app.route("/02.html")
def page_02():
    return render_template('02.html')

@app.route("/03.html")
def page_03():
    return render_template('03.html')

@app.route("/004.html")
def page_004():
    return render_template('004.html')

@app.route("/005")
def page_005():
    return render_template('005.html')

@app.route("/006")
def page_006():
    return render_template('006.html')

@app.route("/007")
def page_007():
    return render_template('007.html')

@app.route("/008")
def page_008():
    return render_template('008.html')

@app.route("/009")
def page_009():
    return render_template('009.html')

@app.route("/010")
def page_010():
    return render_template('010.html')

@app.route("/011")
def page_011():
    return render_template('011.html')


#-------------------------------------------------------------
# standard boilerplate
if __name__ == '__main__':
    app.run(debug=True, use_reloader=True)
