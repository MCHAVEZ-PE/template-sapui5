sap.ui.define([
    './BaseController'
], function (BaseController) {
    'use strict';
    var oRouter = null;
    return BaseController.extend("estandar.csti.controller.Home", {
        onInit: function () {
            oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("Home").attachPatternMatched(this.configurationInit, this);
        },
        configurationInit: function () {
            console.log("hola")
        }
    });
});