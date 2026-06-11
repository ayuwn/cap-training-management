sap.ui.define([
    "sap/ui/core/mvc/ControllerExtension",
    "sap/m/Table",
    "sap/m/plugins/ColumnResizer"
], function (ControllerExtension, MTable, ColumnResizer) {
    "use strict";

    function removeColumnResize(oView) {
        const aTables = oView.findAggregatedObjects(true, function (oControl) {
            return oControl instanceof MTable;
        });

        aTables.forEach(function (oTable) {
            const aDependents = oTable.getDependents();

            aDependents.forEach(function (oDependent) {
                if (oDependent instanceof ColumnResizer) {
                    oTable.removeDependent(oDependent);
                    oDependent.destroy();
                }
            });
        });
    }

    return ControllerExtension.extend("sap.fe.cap.training.ext.controller.ListReportExt", {
        override: {
            onInit: function () {
                const oView = this.base.getView();

                setTimeout(function () {
                    removeColumnResize(oView);
                }, 500);

                setTimeout(function () {
                    removeColumnResize(oView);
                }, 1500);
            },

            onAfterRendering: function () {
                removeColumnResize(this.base.getView());
            }
        }
    });
});