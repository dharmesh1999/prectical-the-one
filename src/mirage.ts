import { createServer, Model } from "miragejs";

export function makeServer() {
  return createServer({
    models: {
      employee: Model,
    },

    seeds(server) {
      server.db.loadData({
        employees: [
          {
            id: 1,
            name: "John Smith",
            age: 30,
            position: "Senior Engineer",
          },
          {
            id: 2,
            name: "Emma Johnson",
            age: 28,
            position: "Marketing Specialist",
          },
          {
            id: 3,
            name: "Michael Chen",
            age: 32,
            position: "Sales Executive",
          },
          {
            id: 4,
            name: "Sarah Williams",
            age: 29,
            position: "HR Manager",
          },
          {
            id: 5,
            name: "David Brown",
            age: 35,
            position: "Finance Director",
          },
          {
            id: 6,
            name: "Lisa Rodriguez",
            age: 27,
            position: "IT Support Specialist",
          },
          {
            id: 7,
            name: "Robert Taylor",
            age: 26,
            position: "Customer Support Agent",
          },
          {
            id: 8,
            name: "Olivia Kim",
            age: 31,
            position: "Product Manager",
          },
          {
            id: 9,
            name: "Carlos Gomez",
            age: 33,
            position: "Operations Manager",
          },
          {
            id: 10,
            name: "Rachel Patel",
            age: 36,
            position: "Legal Advisor",
          },
        ],
      });
    },

    routes() {
      this.namespace = "api";

      this.get("/employees", (schema) => schema.all("employee"));
      this.get("/employees/:id", (schema, request) => {
        const id = request.params.id;
        return schema.find("employee", id);
      });
      this.post("/employees", (schema, request) => {
        const data = JSON.parse(request.requestBody);
        return schema.create("employee", data);
      });
      this.put("/employees/:id", (schema: any, request) => {
        const id = request.params.id;
        const data = JSON.parse(request.requestBody);
        const employee = schema.find("employee", id);
        return employee?.update(data);
      });

      this.del("/employees/:id", (schema: any, request) => {
        const id = request.params.id;
        return schema.find("employee", id)?.destroy();
      });
    },
  });
}
