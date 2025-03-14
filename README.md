# Coffee Roasting

DB, and public website FE for Kyle's home coffee roasting.

## Tooling

- sqlite/D1
- Cloudflare Workers
- HTMX
- shadcn?

## Roadmap

1. ~schema for roast log~
2. public display of roasts
3. public UI for adding roasts
4. multi-lingual site

## Schema

```
CREATE TABLE lots(
    lot_id int,
    purchase_date date,
    grow_date date,
    country text,
    region text,
    sub_region text,
    weight int,
    primary key (lot_id)
);

CREATE TABLE roasts(
    roast_id int primary key,
    roast_date date,
    charge_temp int,
    dry end int,
    first_crack int,
    second_crack int,
    roast_end int,
    green_weight int,
    roasted_weight int,
    notes text,
    lot_id int references lots(lot_id)
);
