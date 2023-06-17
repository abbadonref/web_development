#include "mainwindow.h"

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent){
    QVBoxLayout *myLayout = new QVBoxLayout;
    widget = new GLWidget;
    QWidget *wid = new QWidget();
    widget->setMinimumSize(500, 500);
    myLayout->addWidget(widget);
    wid->setLayout(myLayout);
    setCentralWidget(wid);
}

MainWindow::~MainWindow(){}
