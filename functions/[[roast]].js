const LANG = 'en'

/**
 * GET /:lang:/(roasts|beans)
 * defaults to /en/roasts
 */
export async function onRequestGet(context) {
  const DB = context.env.roasts
  const url_params = context.params.roast // [:lang:, page]
  
  console.log(context.params)

  // render basic homepage
  if (url_params === undefined) {
    return homepage()
  }

  if (url_params[1] === 'roasts') {
  const { results: roasts } = await DB.prepare(`
    SELECT
        *
    FROM
        roasts
    `
    ).all()
  let doc = `
    <html>
    <head>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/picnic">
      <title>Roasts</title>
    </head>
    <body>
      <h1>Roasts</h1>
      <div> See all roasts here </div>
      <div>
      <table class="primary">
        <thead>
          <tr>
            <th>ID</th>
            <th>Roast Date</th>
            <th>Charge Temp (F)</th>
            <th>Roast Date</th>
            <th>Roast Date</th>
            <th>Roast Date</th>
            <th>Roast Date</th>
          </tr>
        </thead>
        <tbody>
          <tr hx-target="this" hx-swap="outerHTML">
            <td>${roasts[0].roast_id}</td>
            <td>${roasts[0].roast_date}</td>
            <td>${roasts[0].charge_temp}</td>
            <td>${roasts[0].state}</td>
          </tr>
        </tbody>
      </table>
      </div>
    </body>
    </html>
  `
  return new Response(doc, {
    headers: {
      'Content-Type': 'text/html;charset=utf-8',
    },
  })
  }
  if (url_params[1] === 'beans') {
    const { results: beans } = await DB.prepare(`
      SELECT
          *
      FROM
          lots
      `
    ).all()
    let doc = `
      <html>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/picnic">
        <title>Roasts</title>
      </head>
      <body>
        <h1>Beans</h1>
        <div> See all green beans here </div>
        <div>
        <table class="primary">
          <thead>
            <tr>
              <th>ID</th>
              <th>Purchase Date</th>
              <th>Country</th>
              <th>Region</th>
              <th>Sub-Region or Farm</th>
            </tr>
          </thead>
          <tbody>
    `
    for (const bean of beans) {
      doc += `
          <tr hx-target="this" hx-swap="outerHTML">
            <td>${bean.lot_id}</td>
            <td>${bean.purchase_date}</td>
            <td>${bean.country}</td>
            <td>${bean.region || ''}</td>
            <td>${bean.sub_region || ''}</td>
          </tr>
      `
    }
    doc += `
          </tbody>
        </table>
        </div>
      </body>
      </html>
    `
    return new Response(doc, {
      headers: {
        'Content-Type': 'text/html;charset=utf-8',
      },
    })
  }
}

function homepage() {
  return new Response(`<html><body>
      <h1>Roasts</h1>
      <p>Under Construction</p>
      <p>
        Try visiting <a href="/${LANG}/roasts">roasts</a> or
        <a href="/${LANG}/beans">beans</a>
      </p>
      </body>
      </html>
    `, {
    headers: {
      'Content-Type': 'text/html;charset=utf-8',
    },
  })
}
