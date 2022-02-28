'use strict'
import {
    Router
} from 'express';
const router = Router();
import axios from 'axios';
const baseURL = 'https://testapi.donatekart.com/api/campaign'; //make use of env file.

router.get('/api/v1/campaigns/all', async (req, res) => {
    axios.get(baseURL).then((response) => {
        var data = response.data.map(item => {
            return ({
                title: item.title,
                totalAmount: item.totalAmount,
                backersCount: item.backersCount,
                endDate: item.endDate
            })
        });
        res.status(200).send(data);
    }).catch((error) => {
        console.log(error);
        response.status(400).send(error);
    })
});

router.get('/api/v1/campaigns/active', async (req, res) => {
    axios.get(baseURL).then((response) => {
        var data = response.data.filter(item => {
            return item.endDate >= (new Date().toISOString()) && new Date().getTime() - new Date(item.created).getTime() <= 30 * 24 * 60 * 60 * 1000;
        })
        res.status(200).send(data);
    }).catch((error) => {
        console.log(error);
        response.status(400).send(error);
    })
});

router.get('/api/v1/campaigns/closed', async (req, res) => {
    axios.get(baseURL).then((response) => {
        var data = response.data.filter(item => {
            return item.endDate < (new Date().toISOString()) || item.procuredAmount >= item.totalAmount;
        })
        res.status(200).send(data);
    }).catch((error) => {
        console.log(error);
        response.status(400).send(error);
    })
})

export default router