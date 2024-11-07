let times = 0;

const syncDB = () => {
    times++;
    console.log(`Tick cada múltipo de 4 segundos: ${times}`);
    return times;
}

module.exports = {
    syncDB
}