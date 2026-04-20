// This line is not required on Node 18+
// Note that we're using ESM in all samples
//import fetch from "node-fetch";

const res = await fetch("https://api.ror.org/v2/organizations?query=U.%20Alaska%20System%20of%20Higher%20Education");
const data = await res.json();
console.log(data);