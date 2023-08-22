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
    <p><b>P.S.</b> This operation required to add the first user.</p>
    <p>You can add @Public directive for all controllers in development.</p>
    <p>But in production I suggest to delete @Public from protected controllers and use authorize guard inside API for protection</p>
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
    <details>
    <summary><b>PUT vs PATCH?</b></summary>
    <p>I used PUT, because, we should update sub-collections like skills and ect.</p>
    <p>PATCH rewrite single fields and add additional data to collection. For instance, you can add new skills, but can't delete unnecessary!</p>
    <p>Note!!! Each PUT rewrite all data!</p>
    </details>
    <details>
    <summary><b>Can't add new Cv (employeeId)?</b></summary>
    <p><b>'employeeId'</b> field is necessary for relation between employee and cv.</p>
    <p>You cant add cv without relation to employee. Please, check <b>'employeeId'</b> property if something goes wrong!</p>
    </details>
    <details>
    <summary><b>All types of errors in the project!</b></summary>
    <p><b>Note:</b> Every time read error message! That can help you to resolve a problem.</p>
    <p><b>400</b> Bad request Error. Check you body or parameters!</p>
    <p><b>401</b> Unauthorized Error. Happened if you haven't got an access-token or have incorrect token. You should log-in/sign-in or refresh tokens!</p>
    <p><b>403</b> Forbidden Error. Happened if credentials or refresh-token are incorrect. Check credentials and re log-in!</p>
    <p><b>404</b> Not found Error. Happened if entity isn't exist. Check your id.</p>
    <p><b>500</b> Internal server Error. This error will arrive if I couldn't handle error. See message to resolve it.</p>
    </details>
    </article>`
  )
  .setVersion('1.0')
  .build();
