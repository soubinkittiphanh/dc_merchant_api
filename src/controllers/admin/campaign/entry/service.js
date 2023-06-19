const { Op } = require('sequelize');
const logger = require('../../../../api/logger');
const { internalCommunicationResponse } = require('../../../../common');


const CampaignEntry = require('../../../../models').campaignEntry
const createBulk = async (req, res, listOfEntry) => {
    CampaignEntry.bulkCreate(listOfEntry)
        .then(() => {
            logger.info('Rows inserted successfully')
            return res.status(200).send("Transction completed")
        })
        .catch((error) => {
            logger.error('Error inserting rows:', error)
            return res.status(403).send("Server error " + error)
        });
}

const bulkDelete = (listOfEntry) => {
    internalCommunicationResponse.msg = 'Transacion completed'
    internalCommunicationResponse.mti = '00'
    for (const iterator of listOfEntry) {
        CampaignEntry.destroy({ where: { id: iterator['id'] } })
            .then(numDeleted => {
                console.log(`${numDeleted} records deleted`);
            })
            .catch(error => {
                console.error(error);
                internalCommunicationResponse.key = iterator['id']
                internalCommunicationResponse.msg = error
                internalCommunicationResponse.mti = '01'
                return internalCommunicationResponse
            });
    }
    return internalCommunicationResponse
}
const bulkUpdateCampaignEntryByListOfId = async (req, res, listOfEntry,campaignId) => {
    let listOfNotFoundEntry = []
    /* First we will delete old entry those 
    which not available in listOfEntry from
    */

    // ********************************************************* //
    for (const iterator of listOfEntry) {
        try {
            if (iterator.id) {
                const campaignEntry = await CampaignEntry.findByPk(iterator['id']);
                if (!campaignEntry) {
                    logger.error("Cannot update campaign entry id: " + iterator['id'])
                } else {
                    const updatedCampaignEntry = await campaignEntry.update(iterator);
                }
            } else {
                /* *********** If Entry not found then we will push to not 
                found list and then create once with bulk create function 
                *********************************************************/
                listOfNotFoundEntry.push(iterator)

            }

        } catch (err) {
            console.error(err);
            return res.status(201).send("Server error " + err)
        }
    }
    // ************ Create those  add new entry ************ //
    if (listOfNotFoundEntry.length > 0) {
        await createBulk(req, res, assignCampaingIdToEntry(listOfNotFoundEntry,campaignId))
    } else {
        res.status(200).send("Transaction completed")
    }
}
assignCampaingIdToEntry = (entry, campaignId) => {
    for (let i = 0; i < entry.length; i++) {
        entry[i]['campaign_id'] = campaignId;
        entry[i]['campaignId'] = campaignId;
    }
    return entry
}

module.exports = {
    createBulk,
    bulkDelete,
    bulkUpdateCampaignEntryByListOfId
}