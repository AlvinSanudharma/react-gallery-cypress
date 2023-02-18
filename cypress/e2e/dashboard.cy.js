describe("Dashboard Page Test Cases", () => {
  it("Do Login with Correct values", () => {
    cy.visit("http://localhost:3000");

    const email = cy.get("input[name='email']");
    email.type("user@react.test");

    const password = cy.get("input[name='password']");
    password.type("password");

    const button = cy.get("button");
    button.click();

    cy.on("window:alert", (text) => {
      expect(text).to.contains("welcome");
    });

    cy.url().should("eq", "http://localhost:3000/dashboard");
  });

  it("Found 0 Photos for the first time", () => {
    cy.contains("Found 0 photos");
  });

  it("Contains image url, description input and publish button", () => {
    const image = cy.get("input[name='image']");

    image.should("be.visible");
    image.should("have.attr", "type", "url");
    image.should("have.attr", "required", "required");
    image.should("have.attr", "placeholder", "Image URL");

    const description = cy.get("input[name='desc']");

    description.should("be.visible");
    description.should("have.attr", "type", "text");
    description.should("have.attr", "required", "required");
    description.should("have.attr", "placeholder", "What's on your mind?");

    const button = cy.get("button.button-primary");
    button.should("be.visible");
    button.contains("Publish!");
    button.should("have.css", "background-color", "rgb(79, 70, 229)");
    button.should("have.css", "color", "rgb(255, 255, 255)");
  });

  it("Upload some photos", () => {
    const photos = [
      {
        imageValue:
          "https://images.unsplash.com/photo-1573790387438-4da905039392?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmFsaXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        descriptionValue: "This is first image",
      },
      {
        imageValue:
          "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8YmFsaXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        descriptionValue: "This is second image",
      },
    ];

    for (let i = 0; i < photos.length; i++) {
      const { imageValue, descriptionValue } = photos[i];

      const image = cy.get("input[name='image']");
      image.type(imageValue);

      const description = cy.get("input[name='desc']");
      description.type(descriptionValue);

      const button = cy.get("button.button-primary");
      button.click();

      cy.get("img").should("have.attr", "src", imageValue);
      cy.contains(descriptionValue);
    }

    cy.contains(`Found ${photos.length} photos`);
  });
});
