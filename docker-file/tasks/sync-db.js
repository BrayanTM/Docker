let times = 0;

const syncDB = () => {
    times += 1;
    console.log(`Cron job executed ${times} times`);

    return times;
};

module.exports = {
    syncDB
};