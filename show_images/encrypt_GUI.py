#Author:cxc
#Date:2020.07.19
#Version:1.0

import base64

from tkinter import *
from tkinter import filedialog
import tkinter.font as tkFont
import os

#浏览命令Scan
def Scan():
    global src_path
    file_path = filedialog.askopenfilename()
    src.set(file_path)
    src_path = src.get()

#保存命令Save
def Save():
    global des_path
    file_path = filedialog.asksaveasfilename(filetypes=[('image', '*.*')])
    des.set(file_path)
    des_path = des.get()

#转换命令Change1
def Change1():
    f=open(src_path,'rb')
    f_byte=base64.b64encode(f.read())
    ff=open(des_path,"w", encoding='utf-8')
    ff.write(str(f_byte))
    ff.close

#转换命令Change2
def Change2():
    f=open(src_path,'r')
    bs64=f.read()
    if bs64.startswith("b'"):
        bs64=bs64.split("'")[1]
    else:
        bs64=bs64
    img_data = base64.b64decode(bs64)
    with open(des_path, 'wb') as ff:
        ff.write(img_data)
    ff.close

#退出cmd
def fquit():
    frame.destroy()
    os._exit(0)

#TK窗口布局
root = Tk()
root.title("Pic2Base64code")
frame = Frame(root)
frame.pack(padx=100,pady=50,expand = 1)

lab0 = Label(frame,text="Author:cxc",font=tkFont.Font(size=15))
lab0.grid(row=0, column=0,padx=5,pady=20, sticky=NW)

lab1 = Label(frame, text="源文件:",font=tkFont.Font(size=15))
lab1.grid(row=1, column=0, padx=5, pady=10,sticky=W)

lab2 = Label(frame, text="目的文件:",font=tkFont.Font(size=15))
lab2.grid(row=2, column=0, padx=5, pady=10,sticky=W)

src = StringVar()
ent1 = Entry(frame, textvariable=src)
ent1.grid(row=1, column=1, sticky='ew', columnspan=3)

des = StringVar()
ent2 = Entry(frame, textvariable=des)
ent2.grid(row=2, column=1, sticky='ew', columnspan=3)

button0 = Button(frame, fg="green",text="浏览",command=Scan, default='active',font=tkFont.Font(size=13))
button0.grid(row=1, column=5,columnspan=2)

button1 = Button(frame, fg="green",text="保存",command=Save, default='active',font=tkFont.Font(size=13))
button1.grid(row=2, column=5,columnspan=2)

button2 = Button(frame, fg="blue",text="图片转BASE64", command=Change1, default='active',font=tkFont.Font(size=15))
button2.grid(row=6, column=0,columnspan=1,ipadx=10,pady=20,ipady=5, sticky=W)

button3 = Button(frame, fg="blue",text="BASE64转图片", command=Change2, default='active',font=tkFont.Font(size=15))
button3.grid(row=6, column=2,columnspan=1,ipadx=10,pady=20,ipady=5, sticky=W)

button4 = Button(frame, fg="red",text="退出",  command=fquit, default='disabled',font=tkFont.Font(size=15))
button4.grid(row=6, column=5,columnspan=1,ipadx=10,pady=20,ipady=5, sticky=E)

root.mainloop()
