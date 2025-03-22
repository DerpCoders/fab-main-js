let spamming = false;
let spamChannel = undefined;
let msg = undefined;

function spam(msg) {
    return new Promise((resolve, reject) => {

        if (!spamChannel)
            reject('Channel is undefined!');

        spamChannel.send({content: msg})
        .then(mseg => {
            setTimeout(() => {
                if (spamming) {
                    spam(msg)
                    .then(resolve) 
                    .catch(err => console.log(err));
                }

                else {
                    resolve();
                }
            }, 100)
        })
        .catch(console.log);

    });
}

module.exports = {
    setChannel: function(channel) {
        spamChannel = channel;
    },
    setText: function(text){
       msg = text;
    },
    setStatus: function (statusFlag) {
        let currentStatus = spamming;
        spamming = statusFlag;

        if (statusFlag && currentStatus != statusFlag) {
            spam(msg);
        }
    },

    getStatus: function() {
        return spamming;
    }
};