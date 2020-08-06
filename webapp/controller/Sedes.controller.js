sap.ui.define([
    './BaseController',
    'sap/ui/model/json/JSONModel',
    "sap/m/MessageToast"
], function (BaseController, JSONModel, MessageToast) {
    'use strict';
    var oRouter = null;
    var oView = null;
    var oSede = null;
    var SedeNueva = {
        "ID_SEDE_E": "S-f568379a-db36-411b-8dc0-2cc21149d338",
        "COD_SAP": "0987612",
        "COD_SSAS": "54322",
        // "DESCRIPCION": "Bogotá norte",
        // "UPDATE_AT": "2020-08-05 01:47:05.845000000",
        // "CREATE_AT": "2020-08-05 01:47:05.845000000",
        "ACTIVO": 1
    }
    return BaseController.extend("estandar.csti.controller.Sedes", {
        onInit: function () {
            oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("Sedes").attachPatternMatched(this.configurationInit, this);
            oView = this.getView();
        },
        configurationInit: function () {
            this.postRequest("/obtener/sedes", {}, null, (data) => {
                var oModel = new JSONModel(data.data);
                this.getView().setModel(oModel, 'sedes_no_validas');
            })
        },
        oEditar: function (e) {
            oSede = e.getSource().getBindingContext("sedes_no_validas").getObject();
            oView.byId("oValSede").setValue(oSede.DESCRIPCION);
            // oView.byId("_valorParametro").setValue(e.getSource().getParent().mAggregations.cells[2].mProperties.text);
        },
        oGrabar: function () {
            if (oSede != null) {
                this.postRequest("/update/sedes", oSede, null, (data) => {
                    if (data.status == "200") {
                        oSede.DESCRIPCION = oView.byId("oValSede").getValue();
                        var arrSede = oView.getModel("sedes_no_validas").getData();
                        oView.getModel("sedes_no_validas").setData(arrSede);
                        oView.byId("oValSede").setValue("");
                        MessageToast.show(data.message);
                        oSede = null;
                    }
                })
                return;
            }
            SedeNueva.DESCRIPCION = oView.byId("oValSede").getValue();
            if (SedeNueva.DESCRIPCION.length > 0) {
                this.postRequest("/crear/sedes", SedeNueva, null, (data) => {
                    if (data.status == 200) {
                        var arrSedes = oView.getModel("sedes_no_validas").getData();
                        arrSedes.data_sedes.push(SedeNueva);
                        oView.getModel("sedes_no_validas").setData(arrSedes);
                        oView.byId("oValSede").setValue("");
                        MessageToast.show(data.message);
                    }
                })
                return;
            }
        },
        oEliminar: function (oEvent) {
            oSede = oEvent.getSource().getBindingContext("sedes_no_validas").getObject();
            this.postRequest("/delete/sedes", {}, null, (object) => {
                if (object.status == 200) {
                    var arrSede = oView.getModel("sedes_no_validas").getData();
                    arrSede.data_sedes.map((value, i) => {
                        if (oSede.ID_SEDE_E === value.ID_SEDE_E) {
                            arrSede.data_sedes.splice(i, 1);
                            MessageToast.show(object.message)
                            return;
                        }
                    })
                    oView.getModel("sedes_no_validas").setData(arrSede);
                }
            })
        }
    })

});