const cds = require("@sap/cds");

module.exports = class TrainingService extends cds.ApplicationService {
    async init() {
        const { TrainingRequest } = this.entities;

        async function getNextId() {
            const active = await SELECT.one`max(TrainingRequestID) as maxID`
                .from(TrainingRequest);

            const draft = await SELECT.one`max(TrainingRequestID) as maxID`
                .from(TrainingRequest.drafts);

            const maxActive = active?.maxID || 0;
            const maxDraft = draft?.maxID || 0;

            return Math.max(maxActive, maxDraft) + 1;
        }

        this.before("NEW", TrainingRequest.drafts, async (req) => {
            req.data.TrainingRequestID = await getNextId();
        });

        this.before("CREATE", TrainingRequest, async (req) => {
            if (!req.data.TrainingRequestID || req.data.TrainingRequestID === 0) {
                req.data.TrainingRequestID = await getNextId();
            }
        });

        return super.init();
    }
};