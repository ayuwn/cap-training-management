sap.ui.define(["sap/fe/test/ObjectPage"], function (ObjectPage) {
  "use strict";

  // OPTIONAL
  const AdditionalCustomObjectPageDefinition = {
    actions: {},
    assertions: {},
  };

  return new ObjectPage(
    {
      appId: "sap.fe.cap.training",
      componentId: "TrainingObjectPage",
      entitySet: "Training",
    },
    AdditionalCustomObjectPageDefinition
  );
});
