const CampaignModel = require("../models/campaignModel");
const { handleHttpError } = require('../utils/handleError');
const { matchedData } = require("express-validator");
const ScheduleModel = require("../models/scheduleModel")


async function getAllCampaigns(req, res) {
    try {
        const campaign = await CampaignModel.findAll();
        res.json(campaign);
    } catch (error) {
        console.error('Error al obtener todos las campañas:', error);
        res.status(500).json({ error: 'Error al obtener todos las campañas' });
    }
}

const getCampaign = async (req, res) => {
    try {
        req = matchedData(req);
        const { id } = req;
        const campaign = await CampaignModel.findByPk(id);
        res.json(campaign);
    } catch (error) {
        console.error('Error al obtener la campaña:', error);
        handleHttpError(res, "ERROR_GET_CAMPAIGN")
    }
}

const postCampaign = async (req, res) => {
    try {
        const body = matchedData(req);
        const data = await CampaignModel.create(body);
        res.send({ data });
    } catch (e) {
        handleHttpError(res, 'ERROR_POST_CAMPAIGN')
    }
}

const updateCampaign = async (req, res) => {
    try {
        const { id } = req.params;
        const body = matchedData(req, { onlyValidData: true });
        const campaignBeforeUpdate = await CampaignModel.findByPk(id);
        if (!campaignBeforeUpdate) {
            return res.status(404).send({ error: "Campaing not found" });
        }
        await CampaignModel.update(body, {
            where: { ID_campaign: id }
        });
        const campaignAfterUpdate = await CampaignModel.findByPk(id);
        return res.send({ data: campaignAfterUpdate });
    } catch (error) {
        console.error('Error al actualizar la campaña:', error);
        handleHttpError(res, 'ERROR_UPDATE_CAMPAIGN');
    }
};

const deleteCampaign = async (req, res) => {
    try {
        const { id } = req.params;

        const campaignInSchedule = await ScheduleModel.findOne({
            where: { ID_Campaign: id }
        });
        if (campaignInSchedule) {
            return res.status(404).json({ error: "CAMPAIGN_IN_SCHEDULE" });
        }
        const campaign = await CampaignModel.destroy({
            where: { ID_campaign: id }
        });
        if (campaign === 1) {
            res.json({ message: "Campaign deleted successfully" });
        } else {
            res.status(404).json({ error: "Campaign not found" });
        }
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        handleHttpError(res, "ERROR_DELETE_USER");
    }
};

module.exports = {
    getAllCampaigns: getAllCampaigns,
    postCampaign: postCampaign,
    deleteCampaign: deleteCampaign,
    updateCampaign: updateCampaign,
    getCampaign: getCampaign
};