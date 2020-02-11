const templates = [
  {
    id: 1,
    name: "Column Chromatography",
    properties: [
      {
        name: "Name"
      },
      {
        name: "Description"
      },
      {
        name: "Linear Velocity"
      }
    ],
    relatedTemplates: [
      {
        name: "Load Sample",
        templateId: 4
      },
      {
        name: "FPLC",
        templateId: 3
      },
      {
        name: "Pre Equilibration",
        templateId: 2
      },
      {
        name: "Equilibration",
        templateId: 2
      },
      {
        name: "Load",
        templateId: 2
      },
      {
        name: "Wash",
        templateId: 2
      }
    ]
  },
  {
    id: 2,
    name: "Column Chromatography Step",
    properties: [
      {
        name: "Name"
      },
      {
        name: "Description"
      },
      {
        name: "Linear Velocity"
      }
    ],
    relatedTemplates: []
  },
  {
    id: 3,
    name: "FPLC",
    properties: [
      {
        name: "Name"
      },
      {
        name: "Manufacturer Part Number"
      }
    ],
    relatedTemplates: [
      {
        templateId: 5,
        name: "Location"
      }
    ]
  },
  {
    id: 4,
    name: "Sample",
    properties: [
      {
        name: "Name"
      }
    ],
    relatedTemplates: []
  },
  {
    id: 5,
    name: "Location",
    properties: [
      {
        name: "Name"
      }
    ],
    relatedTemplates: []
  }
];

export default templates;
