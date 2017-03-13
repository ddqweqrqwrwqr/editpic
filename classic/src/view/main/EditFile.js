Ext.define('editpic.view.window.EditFile', {
    extend: 'Ext.window.Window',

    requires: [
        'editpic.view.window.EditFileController',
        'editpic.view.window.EditFileModel'
    ],

    controller: 'window-editfile',
    viewModel: {
        type: 'window-editfile'
    },
    autoShow: true,

    width: 800,
    frame: true,
    autoShow: true,

    layout: "auto",
    defaults: {
        margin: 10
    },

    title: "Edit",
    showTextArea: true,//是否显示textarea
    showFileButton: true,//是否使用fileButton
    showCombo: false,
    okHandler: null,
    fileName: null,//button按钮上传的文件名
    replaceClick:null,
    //combo: null,

    initComponent: function () {
        var me = this;
        me.items = []
        if (me.showCombo) {
            me.items.push(me.combo);
        }
        if (me.showCombo) {
            me.items.push(me.combo);
        }
        if (me.showFileButton) {
            me.fileButton = Ext.create("Ext.form.field.FileButton", {
                xtype: "filebutton",
                text: "Select File",
                listeners: {
                    change: function (menu, target, eOpts) {
                        var win = menu.up("window")

                        var files = target.target.files;
                        if (files.length) {
                            var file = files[0];
                            win.fileName = file.name;
                            console.log(file)
                            var reader = new FileReader();
                            reader.onload = function () {
                                win.textArea.setValue(this.result);
                            };
                            reader.readAsText(file);
                        }
                    }
                }
            })

            me.items.push(me.fileButton);
        }

        if (me.showTextArea) {
            me.textArea = Ext.create("Ext.form.field.TextArea", {
                width: "100%",
                border: false,
                height: 500
            })

            me.items.push(me.textArea)
        }
        me.buttons = [
            {
                text: "replace", handler: me.replaceClick||"replaceClick"
            },
            "->",
            {
                text: 'OK',
                itemId: "Ok",
                handler: me.okHandler || function (menu) {
                    menu.setDisabled(true);

                    var jsonData = Ext.decode(textarea.getValue())
                    var str = "<div style='color: darkturquoise;'>";
                    for (var name in jsonData) {
                        str += name + ".json  "
                    }
                    str += "</div>";
                    Ext.Msg.show({
                        title: 'warning !',
                        message: "select yes to ovewrite files  <br>" + str,
                        buttons: Ext.Msg.YESNOCANCEL,
                        icon: Ext.Msg.WARNING,
                        fn: function (btn) {
                            if (btn === 'yes') {
                                for (var data in jsonData) {
                                    My.savePicPanelData(data, Ext.encode(jsonData[data]))
                                }
                                win.close();
                            } else {

                                win.close();
                            }
                        }
                    });


                }
            }, {
                text: "Close",
                itemId: "Close",
                handler: function () {
                    me.close()
                }
            }
        ]
        me.callParent();
    }
});
