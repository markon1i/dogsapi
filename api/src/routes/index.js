const { Router } = require('express');
const axios = require('axios');
const { Temp, Dog } = require('../db');
const { Op } = require("sequelize");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);




router.get('/dogs', async (req, res) => {
    try {
        const { name } = req.query;
        if (name) {
            const raza = (await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)).data;
            //console.log(raza);
            if (raza.length === 0) return res.status(404).send('no se econtro raza de perro')
            else {
                const db = await Dog.findAll({
                    include: Temp,
                    where: {
                        name: {
                            [Op.iLike]: "%" + name + "%",
                            //realiza una consulta parcial a la db sin diferenciar mayusculas y minusculas
                        }
                    },
                });
                if (db.length > 0) {
                    return res.status(200).json(db)
                }
                const razas = raza.map(e => {
                    return {
                        id: e.id,
                        name: e.name,
                        height: e.height.metric,
                        weight: e.weight.metric,
                        image: `https://cdn2.thedogapi.com/images/${e.reference_image_id}.jpg`,
                        life_span: e.life_span,
                        temperament: e.temperament !== undefined ? e.temperament : null

                    }
                })
                if (razas.length > 0) {
                    return res.status(200).json(razas)

                }
            }
        } else {
            const dogsApi = (await axios.get('https://api.thedogapi.com/v1/breeds')).data;
            //console.log(dogsApi);
            const dogs = await Promise.all(dogsApi.map(async (dog) => {
                const nameTemperament = dog.temperament?.split(', ');
                console.log(nameTemperament);
                if (dog !== undefined) {
                    const temperament = (await Promise.all(nameTemperament !== undefined ? nameTemperament.map(async (name) => {
                        return await Temp.findAll({
                            where: { name: name.toLowerCase() },
                            attributes: ['id', 'name'],
                            raw: true
                        })
                    }) : [])).flat();
                    //console.log(temperament);
                    return {
                        id: dog.id,
                        name: dog.name,
                        height: dog.height.metric,
                        weight: dog.weight.metric,
                        image: dog.image.url,
                        life_span: dog.life_span,
                        temperament: temperament

                    }
                }
            }))

            const db = await Dog.findAll({
                include: [
                    {
                        model: Temp,
                        attributes: ["id", "name"],
                        raw: true,
                        through: {
                            attributes: [],
                        },
                    },
                ],
            });
            //console.log(db);
            const concat = dogs.concat(db)
            //console.log(concat);
            return res.status(200).json(concat);
        }
    } catch (err) {
        console.log(err);
    }

});

router.get('/dogs/:id', async (req, res) => {
    const { id } = req.params;
    if (Number(id)) {
        try {
            axios.get(`https://api.thedogapi.com/v1/breeds`).then((response) => {
                const matchDogById = response.data.find((dog) => dog.id == id);
                return res.json(matchDogById);
            });
        } catch (error) {
            res.status(404).send(error.message);
        }
    } else {
        const localBreedById = await Dog.findByPk(id, {
            include: Temp,
        });
        let temperamentFront = [];
        console.log(localBreedById);
        localBreedById.temps.forEach((temperament) => {
            temperamentFront.push(temperament.name);
        });
        const breedObj = {
            id: localBreedById.id,
            name: localBreedById.name,
            height: localBreedById.height,
            weight: localBreedById.weight,
            image: localBreedById?.image?.url,
            life_span: localBreedById?.life_span,
            temperament: temperamentFront
        };
        //console.log(breedObj);
        res.json(breedObj);
    }
})

router.post('/dogs', async (req, res) => {
    try {
        const { name, weight, height, life_span, temperament } = req.body;
        //console.log(name, weight, height, life_span, temperament)
        if (!name || !weight || !height) return res.status(404).send('faltan campos oblibatorios');
        const postDog = await Dog.create({
            name,
            height,
            weight,
            life_span
        })
        //console.log(temperament)
        if (temperament.length > 0) {
            let temperamentDb = (await Promise.all(temperament.map(async (temp) => {
                const obj = { name: temp.toLowerCase() }
                return await Temp.findAll({ where: obj })
            }))).flat();
            console.log(temperamentDb);
            await postDog.addTemp(temperamentDb);
            return res.status(200).json(postDog);
        }
        return res.status(200).json(postDog);

    } catch (error) {
        console.log(error);
    }
});

router.get("/temperaments", async (req, res) => {
    try {
        const temperamentApi = (await axios.get(
            `https://api.thedogapi.com/v1/breeds`
        )).data;
        let temperament = temperamentApi.map((d) =>
            d.temperament ? d.temperament : "no se tiene temperamento"
        );
        let temp2 = temperament.map((d) => d.split(", "));
        let setTemp = new Set(temp2.flat());
        console.log(setTemp);
        for (el of setTemp) {
            if (el)
                await Temp.findOrCreate({
                    where: { name: el.toLowerCase() },
                });
        }
        temperamentoBd = await Temp.findAll();
        //console.log(temperamentApi)
        res.status(200).json(temperamentoBd);
    } catch (error) {
        res.status(404).send("No se tiene respuesta a su solicitud" + error);
    }
});

module.exports = router;
