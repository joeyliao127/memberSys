from flask import *

import pymongo
# client = pymongo.MongoClient(connect to MongoDB)
print("連線DB成功")
member_db = client.member
users_collection=member_db.users

app = Flask(__name__, static_folder="Public")
app.secret_key = "secret_keyyyyyyy"

@app.route("/")
def index():
    return render_template("index.html", state = session["state"])

@app.route("/signin", methods=["POST"])
def signin():
    # session["state"] = True
    username = request.form["username"]
    password = request.form["password"]
    result = users_collection.find_one({"$and": [
        {"username": username},
        {"password": password}
    ]})

    # print(f"check = {result}\n,user = {username}\n us = {result['username']}\n, passwd = {password}\n ps = {result['password']}\n")
    if(result):
        session["state"] =  True
        return redirect("/member")
    elif(username == "" or password ==""):
        session["state"] =  False
        return redirect(url_for("error", log = "empty"))
    else:
        session["state"] =  False
        return redirect(url_for("error", log = "not match"))

@app.route("/signout")
def signout():
    session["state"] =  False
    return redirect("/")

@app.route("/member")
def member():
    if(session["state"]):
        return render_template("success.html", session_state = session["state"]) 
    else:
        return redirect("/")

@app.route("/error")
def error():
    log = request.args.get("log")
    if(log == "empty"):
        return render_template("fail.html", message = "帳號或密碼不能為空")
    elif(log == "not match"):
        return render_template("fail.html", message="帳號或密碼錯誤")
    else:
        return "發生未知的錯誤"


@app.route("/square/<number>")
def square(number):
    num = int(number) * int(number)
    return render_template("squared.html", number=num)


@app.route("/signup")
def signup():
    return render_template("signup.html")

@app.route("/register", methods=["POST"])
def register():
    username = request.form["username"]
    password = request.form["password"]
    result = users_collection.insert_one({"username": username, "password": password})
    all = users_collection.find()
    for user in all:
        print(f"新增帳號後的collection狀態:{user}")
    return redirect("/")

print("正在執行flask..")
app.run(port=3000, debug=True, use_reloader=True)

