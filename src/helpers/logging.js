export const logReq = (req) => {
    console.log(req.method, req.url);
    console.log("params : ", req.params);
    console.log("query : ", req.query);
    console.log("body : ", req.body);
};