import resend
from fastapi import HTTPException

from app.core.config import settings

resend.api_key = settings.RESEND_API_KEY


EMAIL_TEMPLATE  = '''
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <meta content="width=device-width" name="viewport" />
    <link
      rel="preload"
      as="image"
      href="https://resend-attachments.s3.amazonaws.com/1edafdc6-f8c2-41d7-b2d3-157841ea8d41" />
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta content="IE=edge" http-equiv="X-UA-Compatible" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta
      content="telephone=no,address=no,email=no,date=no,url=no"
      name="format-detection" />
  </head>
  <body>
    <!--$--><!--html--><!--head--><!--body-->
    <table
      border="0"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      align="center">
      <tbody>
        <tr>
          <td>
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;font-size:1.0769230769230769em;min-height:100%;line-height:155%;padding-top:30px;padding-right:0px;padding-bottom:0px;padding-left:0px">
              <tbody>
                <tr>
                  <td>
                    <table
                      align="center"
                      width="100%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="align:center;width:100%;padding-left:50px;padding-right:50px;border-color:#7e8a9a;padding-top:50px;padding-bottom:50px;border-width:1px;border-radius:10px;line-height:155%;border-style:solid;max-width:500px;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif">
                      <tbody>
                        <tr>
                          <td>
                            <div></div>
                            <table
                              align="center"
                              width="100%"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation">
                              <tbody>
                                <tr>
                                  <td>
                                    <table
                                      align="center"
                                      width="100%"
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      role="presentation">
                                      <tbody style="width:100%">
                                        <tr style="width:100%">
                                          <td
                                            data-id="__react-email-column"></td>
                                          <td
                                            data-id="__react-email-column"></td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <img
                              alt="OneTech B.S logo with white and orange text on a dark blue gradient background."
                              height="71"
                              src="https://resend-attachments.s3.amazonaws.com/1edafdc6-f8c2-41d7-b2d3-157841ea8d41"
                              style="display:block;outline:none;border:none;text-decoration:none;max-width:100%;border-radius:8px"
                              width="72" />
                            <h1
                              style="margin:0;padding:0;font-size:2.25em;line-height:1.44em;padding-top:0.389em;font-weight:600">
                              <span>Welcome, your account has been </span
                              ><span style="color:#db5a07">approved!</span>
                            </h1>
                            <hr
                              class="divider"
                              style="width:100%;border:none;border-top:1px solid #eaeaea;padding-bottom:1em;border-width:2px" />
                            <p
                              style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                              <br />
                            </p>
                            <h2
                              style="margin:0;padding:0;font-size:1.8em;line-height:1.44em;padding-top:0.389em;font-weight:600">
                              <span>Hey </span>{{{USERNAME}}}
                            </h2>
                            <p
                              style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                              <span>your account</span>
                            </p>
                            <p
                              style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                              <span>email : </span>{{{USER_EMAIL}}}
                            </p>
                            <p
                              style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                              <span
                                >has been approved by the admin, you can now log
                                in by clicking on the button below
                              </span>
                            </p>
                            <p
                              style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                              <br />
                            </p>
                            <table
                              align="center"
                              width="100%"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation">
                              <tbody style="width:100%">
                                <tr style="width:100%">
                                  <td
                                    align="center"
                                    data-id="__react-email-column">
                                    <a
                                      class="button"
                                      href="http://localhost:5173/login"
                                      style="line-height:150%;text-decoration:none;display:inline-block;max-width:100%;mso-padding-alt:0px;margin:0;padding:0;background-color:#db5a07;color:#ffffff;border-radius:4px;padding-top:5px;padding-right:10px;padding-bottom:10px;padding-left:10px;font-size:20px;border-color:#db5a07;font-weight:600;width:100%"
                                      target="_blank"
                                      ><span
                                        ><!--[if mso]><i style="mso-font-width:500%;mso-text-raise:11.25" hidden>&#8202;</i><![endif]--></span
                                      ><span
                                        style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:7.5px"
                                        ><span>Login</span></span
                                      ><span
                                        ><!--[if mso]><i style="mso-font-width:500%" hidden>&#8202;&#8203;</i><![endif]--></span
                                      ></a
                                    >
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <p
                              style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                              <br />
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <!--/$-->
  </body>
</html>
'''


def send_mail(to:str, username:str, subject:str):
    html = EMAIL_TEMPLATE
    html = html.replace("{{{USERNAME}}}", username)
    html = html.replace("{{{USER_EMAIL}}}", to)
    params: resend.Emails.SendParams = {
        "from": "OTBS <onboarding@resend.dev>",
        "to": [to],
        "subject": subject,
        "html": html,
    }
    try:
        email = resend.Emails.send(params)
    except:
        raise HTTPException(status_code=404, detail="error on sending mail message")
    print(email)