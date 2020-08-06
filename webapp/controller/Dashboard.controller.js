sap.ui.define([
    './BaseController',
    'sap/ui/export/library',
    'sap/ui/export/Spreadsheet',
    "sap/ui/model/json/JSONModel",
    'sap/ui/model/odata/v2/ODataModel'
], function (BaseController, exportLibrary, Spreadsheet, JSONModel, ODataModel) {
    'use strict';
    var oRouter = null;
    var oView = null;
    var EdmType = exportLibrary.EdmType;
    return BaseController.extend("estandar.csti.controller.Dashboard", {
        onInit: function () {
            oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("Dashboard").attachPatternMatched(this.configurationInit, this);
            oView = this.getView();
        },
        configurationInit: function () {
            var _data = [{
                CODIGO: 123,
                PACIENTE: 'pepito',
                DESCRIPCION: 'LUGAR 1',
                NRO_AUTORIZACIÓN: '0001',
                CUPS: 'ar1',
                PSE: 'ar2',
                PROGRAMA: 'TELECONSULTA',
                LUGAR_ATENCION: 'COL',
                FECHA_HORA: '04/08/20',
                MEDIO_PAGO: 'DEBÍTO',
                ESTADO_PAGO: 'REGULAR'
            }];
            var oModel = new JSONModel(_data);
            oView.byId("oTableExport").setModel(oModel)
        },
        createColumnConfig: function () {
            var aCols = [];

            aCols.push({
                label: 'CODIGO',
                property: ['CODIGO'],
                type: EdmType.String,
            });
            aCols.push({
                label: 'PACIENTE',
                type: EdmType.String,
                property: 'PACIENTE'
            });

            aCols.push({
                label: 'DESCRIPCION',
                property: 'DESCRIPCION',
                type: EdmType.String,

            });

            aCols.push({
                label: 'NRO_AUTORIZACIÓN',
                property: 'NRO_AUTORIZACIÓN',
                type: EdmType.String
            });

            aCols.push({
                label: 'CUPS',
                property: 'CUPS',
                type: EdmType.String
            });

            aCols.push({
                label: 'PSE',
                property: 'PSE',
                type: EdmType.String

            });

            aCols.push({
                label: 'PROGRAMA',
                property: 'PROGRAMA',
                type: EdmType.String
            });

            aCols.push({
                label: 'LUGAR_ATENCIÓN',
                property: 'LUGAR_ATENCION',
                type: EdmType.String
            });
            aCols.push({
                label: 'FECHA_HORA ',
                property: 'FECHA_HORA ',
                type: EdmType.Date
            });
            aCols.push({
                label: 'MEDIO_PAGO',
                property: 'MEDIO_PAGO',
                type: EdmType.String
            });
            aCols.push({
                label: 'ESTADO_PAGO',
                property: 'ESTADO_PAGO',
                type: EdmType.String

            });
            return aCols;
        },
        onDataExport: function () {
            var aCols, oRowBinding, oSettings, oSheet, oTable;

            if (!this._oTable) {
                this._oTable = this.byId('oTableExport');
            }

            oTable = this._oTable;
            oRowBinding = oTable.getBinding('items');

            aCols = this.createColumnConfig();

            var oModel = oRowBinding.getModel();
            console.log(oModel.getData());
       
            oSettings = {
                workbook: {
                    columns: aCols
                },
                dataSource: oModel.getData(),
                fileName: 'Table_export_sample.xlsx',
            };

            oSheet = new Spreadsheet(oSettings);
            oSheet.build().finally(function () {
                oSheet.destroy();
            });
        },

    })
});