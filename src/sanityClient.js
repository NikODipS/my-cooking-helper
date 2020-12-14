import client from "@sanity/client";

const sanityConfig = require("../studio/sanity.json");

export default sanityClient({
	projectId: sanityConfig.api.projectId,
	dataset: sanityConfig.api.dataset,
});
