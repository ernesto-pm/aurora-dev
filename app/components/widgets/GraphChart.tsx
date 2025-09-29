import ReactECharts from 'echarts-for-react';
import {ClientOnly} from "remix-utils/client-only";
import {useEffect, useState} from "react";

export default function GraphChart() {
    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setIsMounted(true)
        }, 150)
    }, [150])

    if (!isMounted) return <div></div>

    function getOption() {
        // --- Fake data builder for a stamp e-commerce graph ---
        const productNames = [
            "MP4 POCKET 4 MOUNT GREEN",
            "R45 MODICO SELLO PERSONALIZADO 42mm",
            "M2 MODICO 2 SELLO PERSONALIZADO (37x11mm)",
            "MP4 POCKET 4 MOUNT DARK BLUE",
            "Sello para vaso de papel - 12oz, 16oz",
            "R45ICBL MODICO R45 INK CARTRIDGE BLUE",
            "G10BL",
            "M14TX MODICO 14 TEXPLATE",
            "ME2ICBK MELON 2 INK CARTRIDGE BLACK",
            "MP4 POCKET 4 MOUNT BLACK",
            "SERVICIO",
            "Sello para vaso cristal y superficies rígidas- 6 oz - 8oz",
            "Sello Melon para toda superficie",
            "R45ICGR MODICO R45 INK CARTRIDGE GREEN",
            "EGIR EGG STAMP INK (1.5ML 5 PACK) RED",
            "G10BK INK 10ML BLACK PROMO",
            "M10DC MODICO 10 DRY CARTRIDGE",
            "M14MR MODICO 14 MOUNT RED",
            "M4ICR MODICO 4 INK CARTRIDGE RED",
            "ME2DC MELON 2 DRY CARTRIDGE",
            "ME5DC Melon 5 Dry Cartridge",
            "MP3MR MODICO POKET 3 MOUNT RED ROSE",
            "PUI5 ML TINTA NEGRO",
            "SALDO A FAVOR",
            "ST15V Stamp Ink 15 ml Violet",
            "Sello para vaso cristal y superficies rígidas - 12oz, 16oz",
            "10% en productos específicos",
            "Sello Modico para papel",
            "ST15G Stamp Ink 15 ml Green",
            "R45ICV MODICO R45 INK CARTRIDGE VIOLET",
            "A25 SELLO PERSONALIZADO",
            "EGIG EGG STAMP INK (1.5ML 5 PACK) GREEN",
            "FS100BK FS INK 100ML BLACK",
            "G10BK INK 10ML BLACK",
            "G5DB GOLF INK 5ML DARK BLUE",
            "M10 MODICO 10 SELLO PERSONALIZADO 89x44mm",
            "M12ICGR MODICO 12 INK CARTRIDGE GREEN",
            "M14MBL MODICO 14 MOUNT BLUE",
            "M3ICB MODICO 3 INK CARTRIDGE BLACK",
            "M4ICG MODICO 4 INK CARTRIDGE GREEN",
            "M5MBK MODICO 5 MOUNT BLACK",
            "ME2 MELON 2 Sello Personalizado",
            "ME3ICDR MELON 3 INK CARTRIDGE DARK RED",
            "ME5 MELON 5 SELLO PERSONALIZADO 62X28MM",
            "ME6MB",
            "MP3MGR POCKET 3 MOUNT GREEN",
            "PUI100BL PUI INK AZUL 100 ML BOTE",
            "PUI5 ML ROJO",
            "R25MBK MODICO R25 2.2cm  MOUNT BLACK",
            "R45TX MODICO R45 TEXTPLATE",
            "ST10T Stamp Ink 10 ml Turquesa",
            "ST15TU Stamp Ink 15 ml Turquesa (Producción especial)",
            "ST5BK Stamp Ink 5 ml Black",
            "Sello para vaso cristal y superficies rigidas- 32oz",
            "i8 Mount Sello de lealtad .8mmø",
            "10% en su orden",
            "Top-up eWallet",
            "Sello de golf",
            "ST20P STAMP INK 20ML PINK (ROSA)",
            "ST15P Stamp Ink 15 ml Pink",
            "ST10O STAMP INK 10ML ORANGE",
            "R45MBK MODICO R45 MOUNT BLACK",
            "170",
            "A25 SELLO GOLFSTAMP PERSONALIZADO",
            "CORRECTION PEN FOR SEALING EXPOSSURE",
            "EGIBL EGG STAMP INK (1.5ML 5 PACK) BLUE",
            "ENVIO POR ESTAFETA",
            "ENZE - ENVIO NACIONAL ZONAS EXTENDIDAS",
            "FS20BL FS INK 20ML BLUE",
            "G10B INK 10ML BLUE",
            "G15DB INK 15ML DARK BLUE",
            "G5BL GOLF INK 5ML BLUE",
            "GUIA",
            "LAMPARA UV",
            "M10MBK MODICO 10 MOUNT BLACK 89x44mm",
            "M12ICBL MODICO 12 INK CARTRIDGE BLUE",
            "M14DC MODICO 14 DRY CARTRIDGE",
            "M14MBK MODICO 14 MOUNT BLACK",
            "M2MBK MODICO 2 MOUNT BLACK",
            "M3DC MODICO 3 DRY CARTRIDGE*",
            "M3MDB MODICO 3 MOUNT DARK BLUE",
            "M4ICBL MODICO 4 INK CARTRIDGE BLUE",
            "M4TX MODICO 4 TEXTPLATE",
            "M5IV MODICO 5 INK CARTRIDGE VIOLET",
            "M6ICG MODICO 6 INK CARTRIDGE GREEN",
            "MARCO PARA SELLO MODICO/MELON",
            "ME2MDB MELON 2 MOUNT DARK BLUE",
            "ME3ICBL MELON 3 INK CARTRIDGE BLUE",
            "ME4DC MELON 4 DRY CARTRIDGE",
            "ME4TX MELON 4 TEXTPLATE",
            "ME5MP Melon 5 Mount Pink",
            "ME6ICR MELON 6 INK CARTRIDGE RED",
            "MEZCAL OAXACA",
            "MP3MDB POCKET 3 MOUNT DARK BLUE",
            "PIGMENT PEN",
            "PUI100BL BOTE TINTA AZUL PUI 100 ML",
            "PUI15BL  PUI Blue",
            "PUI5 ML AZUL",
            "QUERE",
            "R25ICBK MODICO R25 INK CARTRIDGE BLACK",
            "R45ICBK MODICO R45 INK CARTRIDGE BLACK",
            "R45MR MODICO R45 MOUNT RED",
            "ST10BR TINTA STAMP 10 ML CAFE",
            "ST10S STAMP INK SCARLET",
            "ST15DP Stamp Ink 15 ml Dark Pink",
            "ST15SC Stamp Ink 15 ml Scarlet",
            "ST20O STAMP INK 20ML Orange",
            "ST20TU Stamp Ink 20 ml Turquesa (Producción especial)",
            "STAMP20",
            "Sello de lealtad p/toda superficie",
            "Tinta de papel (Stamp)"
        ];

        const categories = [
            { name: "Personalized Stamps" },
            { name: "Mount" },
            { name: "Ink" },
            { name: "Cartridge" },
            { name: "Textplate" },
            { name: "Service/Shipping" },
            { name: "Promo/Discounts" },
            { name: "Accessories" },
            { name: "Misc" }
        ];

// Simple classifier by keywords
        function categorize(name) {
            const n = name.toLowerCase();
            if (/(sello[^a-z]*personalizado|sello (melon|modico)|sello para|golfstamp|sello de lealtad)/i.test(name)) return 0;
            if (/\bmount\b|m\b\d+mbk|\bmount/i.test(name)) return 1;
            if (/\bink\b|tinta|st(5|10|15|20)|pui|fs\d+|g\d+/i.test(name)) return 2;
            if (/cartridge|dc\b|ic\b|ink cartridge|dry cartridge/i.test(name)) return 3;
            if (/textplate|tx\b/i.test(name)) return 4;
            if (/envio|guia|servicio|envi[oó]|top-up|saldo/i.test(n)) return 5;
            if (/%|promo|stamp20|descuento|en su orden|en productos/i.test(n)) return 6;
            if (/lampara|marco|pen|correction/i.test(n)) return 7;
            return 8;
        }

// Seeded-ish random for repeatability
        let seed = 1234;
        function rand() {
            seed = (seed * 9301 + 49297) % 233280;
            return seed / 233280;
        }

// Build nodes: category hubs + products
        const nodes = [];
        const links = [];

// Add hub nodes for categories
        categories.forEach((c, i) => {
            nodes.push({
                id: `cat-${i}`,
                name: c.name,
                category: i,
                symbolSize: 48,
                itemStyle: { borderWidth: 2 },
                value: { type: "hub" }
            });
        });

// Product nodes
        productNames.forEach((name, idx) => {
            const cat = categorize(name);
            const sales = Math.round(10 + rand() * 90); // fake monthly units
            const revK = +(sales * (10 + rand() * 40) / 1000).toFixed(2); // fake revenue in thousands
            const symbolSize = Math.max(8, Math.min(30, Math.round(8 + Math.sqrt(sales))));
            const nodeId = `p-${idx}`;
            nodes.push({
                id: nodeId,
                name,
                category: cat,
                symbolSize,
                value: { sales, revK }
            });
            // link to category hub
            links.push({
                source: nodeId,
                target: `cat-${cat}`
            });
        });

// Cross-sell links: stamps -> ink & mounts
        const stampNodeIds = nodes.filter(n => typeof n.id === "string" && n.id.startsWith("p-") && n.category === 0).map(n => n.id);
        const inkNodes = nodes.filter(n => n.category === 2 && n.id.startsWith("p-"));
        const mountNodes = nodes.filter(n => n.category === 1 && n.id.startsWith("p-"));

        stampNodeIds.forEach((sid) => {
            if (inkNodes.length) {
                const tgt = inkNodes[Math.floor(rand() * inkNodes.length)];
                links.push({ source: sid, target: tgt.id, lineStyle: { opacity: 0.5 } });
            }
            if (mountNodes.length) {
                const tgt = mountNodes[Math.floor(rand() * mountNodes.length)];
                links.push({ source: sid, target: tgt.id, lineStyle: { opacity: 0.5 } });
            }
        });

// Optional: add a few promo → product edges
        const promoNodes = nodes.filter(n => n.category === 6 && n.id.startsWith("p-"));
        promoNodes.forEach(pn => {
            const pick = nodes.filter(n => n.category === 2 || n.category === 0);
            for (let i = 0; i < 3; i++) {
                const tgt = pick[Math.floor(rand() * pick.length)];
                links.push({ source: pn.id, target: tgt.id, lineStyle: { type: "dashed", opacity: 0.6 } });
            }
        });

        const graph = { nodes, links, categories };

// --- Your ECharts option using the built graph ---
        return  {
            tooltip: {
                trigger: 'item',
                formatter: (params) => {
                    if (params.data?.value?.type === "hub") return `<b>${params.name}</b><br/>Category hub`;
                    const v = params.data?.value;
                    return v
                        ? `<b>${params.name}</b><br/>Est. monthly units: ${v.sales}<br/>Est. revenue: $${v.revK}k`
                        : params.name;
                }
            },
            legend: [{
                data: graph.categories.map(a => a.name)
            }],
            series: [{
                name: 'Stamp Shop Graph',
                type: 'graph',
                layout: 'force',              // changed from 'none'
                data: graph.nodes,
                links: graph.links,
                categories: graph.categories,
                roam: true,
                force: {
                    repulsion: 140,
                    edgeLength: [40, 160],
                    gravity: 0.08
                },
                label: {
                    show: true,
                    position: 'right',
                    formatter: '{b}',
                    fontSize: 10
                },
                labelLayout: { hideOverlap: true },
                scaleLimit: { min: 0.4, max: 2 },
                lineStyle: { color: 'source', curveness: 0.25, opacity: 0.8 },
                emphasis: {
                    focus: 'adjacency',
                    lineStyle: { width: 2 }
                }
            }]
        };
    }

    return (
        <ClientOnly fallback={<div>Cargando grafica...</div>}>
            {() => (
                <ReactECharts
                    lazyUpdate={true}
                    option={getOption()}
                    style={{"width": "100%", 'height': '100%'}}
                />
            )}
        </ClientOnly>
    )
}