//Author: Vũ

const GEOAPIFY_KEY = "b175dc9d1a324974866a1be5ba1c7f8a";
const OPENCAGE_KEY = "dbb6366a185a48cf83e29c322818fe66";

const cache = new Map();

function haversineDistance(lat1, lng1, lat2, lng2) {
  const R = 6371e3;
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(Δφ / 2) ** 2 +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // in meters
}

function fetchWithTimeout(url, timeout = 2500) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  return fetch(url, { signal: controller.signal })
    .then((res) => res.json())
    .finally(() => clearTimeout(id))
    .catch(() => null);
}

function makeCacheKey(input, lat, lng) {
  return `${input.toLowerCase()}::${lat.toFixed(3)},${lng.toFixed(3)}`;
}

export async function getSuggestions(input, lat, lng, radius = 2000) {
  const key = makeCacheKey(input, lat, lng);
  if (cache.has(key)) return cache.get(key);

  const query = encodeURIComponent(input);

  const urls = {
    photon: `https://photon.komoot.io/api/?q=${query}&limit=4&lang=vi`,
    geoapify: `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&limit=4&bias=proximity:${lng},${lat}&lang=vi&apiKey=${GEOAPIFY_KEY}`,
    opencage: `https://api.opencagedata.com/geocode/v1/json?q=${query}&language=vi&limit=4&key=${OPENCAGE_KEY}`
  };

  const fetches = Object.entries(urls).map(([name, url]) =>
    fetchWithTimeout(url).then(res => ({ name, res }))
  );

  const all = await Promise.all(fetches);

  let results = [];

  for (const { name, res } of all) {
    if (!res) continue;

    if (name === "photon" && res.features) {
      res.features.forEach(f => {
        const props = f.properties;
        const name = props.name || props.street || null;
        const address = [props.house_number, props.street, props.city, props.country].filter(Boolean).join(", ");
        if (name && address) {
          results.push({ name, address, lat: f.geometry.coordinates[1], lng: f.geometry.coordinates[0] });
        }
      });
    }

    if (name === "geoapify" && res.features) {
      res.features.forEach(f => {
        const props = f.properties;
        const name = props.name || props.street || null;
        const address = props.formatted;
        if (name && address) {
          results.push({ name, address, lat: f.geometry.coordinates[1], lng: f.geometry.coordinates[0] });
        }
      });
    }

    if (name === "opencage" && res.results) {
      res.results.forEach(f => {
        const comp = f.components;
        const name = comp.road || f.formatted;
        const address = f.formatted;
        if (name && address) {
          results.push({ name, address, lat: f.geometry.lat, lng: f.geometry.lng });
        }
      });
    }
  }

  const withDistance = results.map(p => ({
    ...p,
    distance: haversineDistance(lat, lng, p.lat, p.lng)
  }));

  const seen = new Set();
  const unique = withDistance.filter(p => {
    const key = `${Math.round(p.lat * 10000)}_${Math.round(p.lng * 10000)}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  const final = unique
    .filter(p => p.distance <= radius)
    .sort((a, b) => a.distance - b.distance)
    .map(p => ({ name: p.name, address: p.address }));

  cache.set(key, final);
  return final;
}

export async function reverseGeocode(lat, lng) {
  const query = `${lat},${lng}`;

  const urls = {
    geoapify: `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&lang=vi&apiKey=${GEOAPIFY_KEY}`,
    opencage: `https://api.opencagedata.com/geocode/v1/json?q=${query}&language=vi&key=${OPENCAGE_KEY}`
  };

  const fetches = Object.entries(urls).map(([name, url]) =>
    fetchWithTimeout(url).then(res => ({ name, res }))
  );

  const all = await Promise.all(fetches);
  const addresses = [];

  for (const { name, res } of all) {
    if (!res) continue;

    if (name === "geoapify" && res.features?.length) {
      const addr = res.features[0].properties.formatted;
      if (addr) addresses.push(addr);
    }

    if (name === "opencage" && res.results?.length) {
      const addr = res.results[0].formatted;
      if (addr) addresses.push(addr);
    }
  }

  return addresses.length ? addresses[0] : null;
}
