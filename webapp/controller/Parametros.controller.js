sap.ui.define([
    './BaseController',
    'sap/ui/model/json/JSONModel'
], function (BaseController, JSONModel) {
    'use strict';
    var oRouter = null;
    var oView = null;
    var parametro = null;
    return BaseController.extend("estandar.csti.controller.Parametros", {

        onInit: function () {
            oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("Parametros").attachPatternMatched(this.configurationInit, this);
            oView = this.getView();
        },
        configurationInit: function () {
            var modelo = {
                data: [{
                        id: 1,
                        parametro: 'Dias',
                        descripcion: '[...]',
                        valor: '2'
                    }, {
                        id: 2,
                        parametro: 'Horas',
                        descripcion: '[...]',
                        valor: '50% + 1'
                    },
                    {
                        id: 3,
                        parametro: 'Fecha Fin',
                        descripcion: '[...]',
                        valor: '2'
                    }
                ]
            }
            var oModel = new JSONModel(modelo);
            this.getView().setModel(oModel, 'parametros');
        },
        oEditar: function (e) {
            parametro = e.getSource().getBindingContext("parametros").getObject();
            // e.getSource().getParent().mAggregations.cells[2].mProperties.text // otra forma de obtener el id

            oView.byId("_valorParametro").setValue(parametro.valor);
        },
        oGrabar: function () {
            if (parametro != null) {
                parametro.valor = oView.byId("_valorParametro").getValue();
                var arr = oView.getModel("parametros").getData();
                oView.getModel("parametros").setData(arr);
                parametro = null;
                return;
            }

        }
    })

});