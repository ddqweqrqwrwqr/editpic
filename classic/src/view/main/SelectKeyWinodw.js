Ext.define('editpic.view.EventAlarm.SelectKeyWinodw', {
    extend: 'Ext.window.Window',
    alias: "SelectKeyWinodw",
    requires: [
        'editpic.view.EventAlarm.SelectKeyWinodwController',
        'editpic.view.EventAlarm.SelectKeyWinodwModel'
    ],

    controller: 'eventalarm-selectkeywinodw',
    viewModel: {
        type: 'eventalarm-selectkeywinodw'
    },

    title: "Select Key",
    autoShow: true,
    width: 600,
    maxHeight: 390,
    scrollable: "y",
    listeners: {
        boxready: function () {
            console.log(arguments)
        }
    },
    initComponent: function () {
        var me = this;
        me.ip = me.ip || location.host;
        me.port = me.port || "6379";

        me.items = [{
            rootVisible: false,
            xtype: "treepanel",
            listeners: {
                boxready: function (treePanel) {
                    setTimeout(function () {
                        var node = treePanel.store.findNode('value', me.key)
                        if (node) {
                            var path = node.getPath()
                            treePanel.selectPath(path)
                        }
                    }, 1000)
                }
            },
            tbar: [

                {
                    text: 'Expand All',
                    xtype: "button",
                    handler: function (th) {
                        var me = this.up("treepanel");
                        me.expandAll();
                    }
                }, {
                    text: 'Collapse All',
                    xtype: "button",
                    handler: function (th) {
                        var me = this.up("treepanel");
                        me.collapseAll();
                    }
                },
                {
                    xtype: "textfield",
                    emptyText: "Object Name",
                    filterName: "text",
                    listeners: {
                        buffer: 500,
                        change: "onFilterUp"
                    }
                },
                {
                    xtype: "textfield",
                    emptyText: "key",
                    filterName: "value",
                    //enableKeyEvents: true,
                    listeners: {
                        buffer: 500,
                        change: "onFilterUp"
                    }
                }
            ],
            width: "100%",
            height: "100%",
            scrollable: "y",
            modal: true,
            store: {
                type: "tree",
                autoLoad: true,
                filters: [],
                url: EventRootUrl + "graph/resources/main.php?par=nodes",
                proxy: {
                    type: "ajax",
                    url: EventRootUrl + "graph/resources/main.php?par=nodes&ip=" + me.ip + "&port=" + me.port + "",
                    reader: {
                        type: "json"
                    }
                }
            },
            columns: [
                {xtype: "treecolumn", dataIndex: "text", flex: 1},
                {text: "object name", dataIndex: "text", flex: 1},
                {text: "key", dataIndex: "value", flex: 1},

            ]
            /*store: Ext.create("Ext.data.TreeStore", {

             autoLoad: true,
             url: EventRootUrl + "graph/resources/main.php?par=nodes",
             proxy: {
             type: "ajax",
             url: EventRootUrl + "graph/resources/main.php?par=nodes&ip=" + me.ip + "&port=" + me.port + "",
             reader: {
             type: "json"
             }
             }
             })*/
        }]
        me.buttons = [{
            text: "Ok",
            handler: function () {
                //var grid = win.down("treepanel");
                var tree = me.down("treepanel")
                var selectArr = tree.getSelection();
                console.log(selectArr)
                if (!selectArr[0]) {
                    Ext.Msg.alert("Massage", "Please select a key .");

                } else {
                    me.callback(selectArr)
                }
            }
        }, {
            text: "Cancel",
            handler: function () {
                me.close();
            }
        }]
        me.callParent();
        testme = me.down("treepanel");
    }
});
