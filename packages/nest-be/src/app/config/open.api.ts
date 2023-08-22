import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .addBearerAuth()
  .setTitle('Cv-gen API')
  .setDescription(
    `<article>
    <p>This is a cv-gen api. For start using you should:</p>
    <pre><code>
    1. Uncomment @Public directive in auth/users/users.controller.ts
    2. Add first user by using method post for api/users/
    3. Comment @Public directive to avoid unexpected access.
    4. Use your first user credentials for auth and add access token for access.
    5. Congratulate! Now you can use your user for access and add new user if necessary.
    </code></pre>
    <p><b>P.S.</b> This operation required to add the first user. You can add @Public directive for all controllers in development.</p>
    <p>But in production I suggest to use authorize guard inside API for protection</p>
    <h3>FAQ</h3>
    <details>
    <summary><b>How to authorize?</b></summary>
    <p>To get access you should use Authorize button in swagger or Authorization="Bearer <'your-access-token>" header in http request.</p>
    </details>
    <details>
    <summary><b>Difference between scheme with Dto suffix and without it?</b></summary>
    <p>Scheme with Dto suffix used to pass data to the api. Dto is a 'data transfer object'. These schemas are using for POST and PATCH methods</p>
    <p>Schemes without Dto are outputs from GET methods</p>
    </details>
    </article>`
  )
  .setVersion('1.0')
  .build();
