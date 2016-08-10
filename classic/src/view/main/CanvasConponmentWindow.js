Ext.define('editpic.view.window.CanvasConponmentWindow', {
    extend: 'Ext.window.Window',

    requires: [
        'editpic.view.window.CanvasConponmentWindowController',
        'editpic.view.window.CanvasConponmentWindowModel'
    ],

    controller: 'window-canvasconponmentwindow',
    viewModel: {
        type: 'window-canvasconponmentwindow'
    },
    title: "Propertys",
    autoShow: true,
    //maxHeight: Ext.getBody().getHeight(),
    constrainHeader: true,
    scrollable:"y",
    y:0,
    maxHeight:600,

    //height:600,
    //bodyPadding:"5 0 5 0",
    layout:{
        type:"vbox",
        pack: 'start',
        align: 'stretch'
    },
    width:345,
    defaults:{
        margin:5,
        anchor:"95%",
        width:"100%"
    },
    initComponent: function () {
        var me = this;
        var values = me.values;
        var itype = values.itype;
        me.items=[]
        me.labelFormPanel = Ext.create("editpic.view.form.LabelForm", {
            viewModel:me.viewModel,
            values: values,
            itype: itype
        })

        me.bindFormPanel = Ext.create("editpic.view.form.LinkPropertyForm",
            {
                viewModel:me.viewModel,
                values: me.values
            }
        )
        me.bindFormPanel.getForm().setValues(me.values)
        console.log(me.bindFormPanel)
        if(me.labelFormPanel.items.length){
            me.items.push(me.labelFormPanel)
        }
        if(me.bindFormPanel.items.length){
            me.items.push(me.bindFormPanel)
        //me.items = [me.labelFormPanel, me.bindFormPanel];
        }
       /*
        else{
            me.items=me.labelFormPanel
        }*/

        me.buttons = [
            {
                text: "OK", handler: function () {

                var labelForm = me.labelFormPanel.getForm();
                var bindForm = me.bindFormPanel.getForm();
                if (labelForm.isValid()&bindForm.isValid()) {
                    var bindValues = bindForm.getValues()
                    console.log(bindValues)
                    var datas = labelForm.getValues();
                    me.ok(Ext.apply(datas, bindValues));
                    me.close()
                }
            }
            },
            {
                text: "Cancel", handler: function () {

                me.close()
            }
            }
        ]
        me.callParent();
    }
});