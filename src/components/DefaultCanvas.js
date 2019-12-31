let DefaultCanvas = {
  users: [
    {
      email: "hi@hi.hi",
      wireframes: [
        {
          name: "we love boxes",
          width: 400,
          height: 400,
          maxId: 1,
          focus: -1,
          index: 0,
          stencils: [
            {
              type: "box",
              id: 0,
              layout: { width: 100, height: 100, x: 100, y: 100 },
              style: {
                backgroundColor: "silver",
                borderColor: "red",
                borderWidth: 10,
                borderRadius: 20
              }
            },
            {
              type: "box",
              id: 1,
              layout: { width: 100, height: 100, x: 200, y: 200 },
              style: {
                backgroundColor: "cyan",
                borderColor: "green",
                borderWidth: 10,
                borderRadius: 20
              }
            }
          ]
        }
      ]
    }
  ]
};

export default DefaultCanvas;
