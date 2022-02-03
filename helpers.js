

const aprilFoolsOrNo = eNum => {
    const datetime = new Date(Date.now());
    const isAprilFools = (datetime.getMonth() === 3 && datetime.getDate() === 1);
    return isAprilFools ? 418 : eNum;
};

module.exports {
    aprilFoolsOrNo
};
