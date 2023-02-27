const getRoles = async (req = request, res = response) => {

    const { limit = 5, from = 0 } = req.query;

    const queryModify = { status: true };

    let [totalCountRoles] = await Promise.all([
      EpsModel.countDocuments(queryModify)]
    );

    listRoles = await EpsModel.find(queryModify).skip(Number(from)).limit(Number(limit)); 
   
    res.json({
      message: "Get roles & total count roles",
      "Total count roles": totalCountRoles,
      "List roles": listRoles,
    });
};

module.exports = {
    getRoles
}