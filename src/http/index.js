
async function fetchMd(file) {
  const url = `/markdown/${file}.md`;
  const response = await fetch(url);
  const text = await response.text();

  if (!response.ok) {
  // if (response.status !== 200) {
    // throw Error(text.message);
    throw Error(response.statusText);
  }

  return text;
}

async function requestMd(file) {
  try {
    const text = await fetchMd(file);
    return text;
  } catch (err) {
    console.error(`Error: ${err.message}`);
    return null;
  }
}

export default requestMd;
