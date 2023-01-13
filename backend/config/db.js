const colors = require('cli-color')
var mongoose = require('mongoose');

module.exports =
{
    /**
     * Тухайн нэг Моделийн хувьд populate ийг авах
     * @param {Model} Model Модел байна
     * @param {Array} config тохиргоонууд байна
     */
    populate: async (Model, config) => {
        const populated = await Model.populate(...config)
        return populated
    },

    /**
     * MONGODB Баазтай холбогдох нь
     */
    dbConntect: async () => {

        /** Холболтын үг */
        let msg = "connected"
        let bgColor = "bgBlue"

        const db = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .catch((err) => {
            msg = "not connected"
            bgColor = 'bgRed'
            console.log(colors.red(err));
        });

        console.log(colors[bgColor].black('MongoDB', msg));
    },

    /** Холбогдсон баазыг discconect хийх */
    disconnect: async () =>
    {
        await mongoose.disconnect()
            .then(
                rsp =>
                {
                    console.log(colors.bgMagenta.black('MongoDB холболтыг салгасан'));
                }
            )
            .catch(
                err =>
                {
                    console.log(colors.red(err))
                }
            )
    }
}
