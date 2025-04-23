const {nanoid}= require("nanoid");
const URL = require("../models/url")
async function handleGenerateNewShortURL(req, res) {
  try {
    const body = req.body;
    if (!body.url) {
      return res.status(400).json({ error: 'url is required' });
    }
    const short = nanoid(8);
    await URL.create({
      shortID: short,
      redirectURL: body.url,
      visitHistory: [],
      createdBy: req.user.userId,
    });
    return res.json({ id: short});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}


async function getallurl(req,res){
  
 const url = await URL.find({});
 res.json(url);
}

async function handleRedirect(req, res) {
  try {
    const short = req.params.short;
    const url = await URL.findOne({ shortID: short }); // ✅ fixed here

    if (!url) {
      return res.status(404).json({ error: 'URL not found' }); // also fixed typo
    }

    res.redirect(url.redirectURL);
  } catch (error) {
    console.error("Redirect error:", error.stack || error);
    res.status(500).json({ error: 'Redirection failed' });
  }
}


module.exports= {
  handleGenerateNewShortURL,
  getallurl,
  handleRedirect
}