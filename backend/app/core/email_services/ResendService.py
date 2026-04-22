import resend
from fastapi import HTTPException

from app.core.config import settings

resend.api_key = settings.RESEND_API_KEY


APPROVED_EMAIL_TEMPLATE  ='''
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
              style="font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;font-size:1.0769230769230769em;min-height:100%;line-height:155%">
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
                      style="align:center;width:100%;padding-left:20px;padding-right:20px;padding-top:20px;padding-bottom:20px;line-height:155%;max-width:600px;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif">
                      <tbody>
                        <tr>
                          <td>
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
                              role="presentation"
                              style="margin-top:0;margin-right:auto;margin-bottom:0;margin-left:auto;padding-top:0;padding-right:0;padding-bottom:0;padding-left:0">
                              <tbody>
                                <tr>
                                  <td>
                                    <tr style="margin:0;padding:0">
                                      <td
                                        data-id="__react-email-column"
                                        style="margin:0;padding:0">
                                        <img
                                          alt="OneTech B.S logo with white and orange text on a dark blue gradient background."
                                          height="71"
                                          src="https://resend-attachments.s3.amazonaws.com/1edafdc6-f8c2-41d7-b2d3-157841ea8d41"
                                          style="display:block;outline:none;border:none;text-decoration:none;max-width:100%;border-radius:8px"
                                          width="72" />
                                        <h1
                                          style="margin:0;padding:0;font-size:2.25em;line-height:1.44em;padding-top:0.389em;font-weight:600">
                                          <span
                                            >Welcome, your account has been </span
                                          ><span style="color:#db5a07"
                                            >approved!</span
                                          >
                                        </h1>
                                        <hr
                                          class="divider"
                                          style="width:100%;border:none;border-top:1px solid #eaeaea;padding-bottom:1em;border-width:2px" />
                                        <table
                                          align="center"
                                          width="100%"
                                          border="0"
                                          cellpadding="0"
                                          cellspacing="0"
                                          role="presentation"
                                          style="margin-top:0;margin-right:auto;margin-bottom:0;margin-left:auto;padding-top:30px;padding-right:0px;padding-bottom:0px;padding-left:0px;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;font-size:1.0769230769230769em;min-height:100%;line-height:155%">
                                          <tbody>
                                            <tr>
                                              <td>
                                                <tr style="margin:0;padding:0">
                                                  <td
                                                    data-id="__react-email-column"
                                                    style="margin:0;padding:0">
                                                    <h2
                                                      style="margin:0;padding:0;font-size:1.8em;line-height:1.44em;padding-top:0.389em;font-weight:600">
                                                      <span>Hey </span
                                                      >{{{USERNAME}}}
                                                    </h2>
                                                    <p
                                                      style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                                                      <span>your account</span>
                                                    </p>
                                                    <p
                                                      style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                                                      <span>email : </span
                                                      >{{{USER_EMAIL}}}
                                                    </p>
                                                    <p
                                                      style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                                                      <span
                                                        >has been approved by
                                                        the admin, you can now
                                                        log in by clicking on
                                                        the button below</span
                                                      >
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
                                                      role="presentation"
                                                      style="margin-top:0;margin-right:auto;margin-bottom:0;margin-left:auto;padding-top:0;padding-right:0;padding-bottom:0;padding-left:0">
                                                      <tbody>
                                                        <tr>
                                                          <td>
                                                            <tr
                                                              style="margin:0;padding:0;width:100%">
                                                              <td
                                                                align="center"
                                                                data-id="__react-email-column"
                                                                style="margin:0;padding:0">
                                                                <p
                                                                  style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                                                                  <span
                                                                    ><a
                                                                      href="http://localhost:5173/login"
                                                                      rel="noopener noreferrer nofollow"
                                                                      style="color:#0670DB;text-decoration-line:none;text-decoration:underline"
                                                                      target="_blank"
                                                                      ><span
                                                                        style="line-height:150%;text-decoration:none;display:inline-block;max-width:100%;mso-padding-alt:0px;margin:0;padding:0;background-color:#db5a07;color:#ffffff;border-radius:4px;padding-top:5px;padding-right:10px;padding-bottom:10px;padding-left:10px;font-size:20px;border-color:#db5a07;font-weight:600;width:100%"
                                                                        >Login</span
                                                                      ></a
                                                                    ></span
                                                                  >
                                                                </p>
                                                              </td>
                                                            </tr>
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
                                                <tr style="margin:0;padding:0">
                                                  <td
                                                    data-id="__react-email-column"
                                                    style="margin:0;padding:0">
                                                    <p
                                                      style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                                                      <br />
                                                    </p>
                                                  </td>
                                                </tr>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
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


OTP_EMAIL_TEMPLATE = '''
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
          <td
            style="font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;font-size:1em;min-height:100%;line-height:155%">
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="max-width:600px;align:center;width:100%;padding-left:20px;padding-right:20px;padding-top:20px;padding-bottom:20px;line-height:155%">
              <tbody>
                <tr style="width:100%">
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
                          <td align="center" data-id="__react-email-column">
                            <img
                              alt="OneTech B.S logo with white and orange text on a dark blue gradient background."
                              height="71"
                              src="https://resend-attachments.s3.amazonaws.com/1edafdc6-f8c2-41d7-b2d3-157841ea8d41"
                              style="display:block;outline:none;border:none;text-decoration:none;max-width:100%;border-radius:8px"
                              width="72" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      align="center"
                      width="100%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="margin-top:0;margin-right:auto;margin-bottom:0;margin-left:auto;padding-top:0;padding-right:0;padding-bottom:0;padding-left:0">
                      <tbody>
                        <tr style="margin:0;padding:0">
                          <td
                            data-id="__react-email-column"
                            style="margin:0;padding:0">
                            <h1
                              style="margin:0;padding:0;font-size:2.25em;line-height:1.44em;padding-top:0.389em;font-weight:600;text-align:center">
                              OTP verification
                            </h1>
                            <table
                              align="center"
                              width="100%"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation"
                              style="margin-top:0;margin-right:auto;margin-bottom:0;margin-left:auto;padding-top:30px;padding-right:0px;padding-bottom:0px;padding-left:0px;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;font-size:1.0769230769230769em;min-height:100%;line-height:155%">
                              <tbody>
                                <tr style="margin:0;padding:0">
                                  <td
                                    data-id="__react-email-column"
                                    style="margin:0;padding:0">
                                    <hr
                                      class="divider"
                                      style="width:100%;border:none;border-top:1px solid #eaeaea;padding-bottom:1em;border-width:2px" />
                                    <h2
                                      style="margin:0;padding:0;font-size:1.8em;line-height:1.44em;padding-top:0.389em;font-weight:600">
                                      Hey
                                      <!-- -->{{{USERNAME}}}
                                    </h2>
                                    <p
                                      style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                                      your account
                                    </p>
                                    <p
                                      style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                                      email :
                                      <!-- -->{{{USER_EMAIL}}}
                                    </p>
                                    <p
                                      style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                                      this is your otp code so you can login to
                                      your admin account
                                    </p>
                                    <p
                                      style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                                      <br />
                                    </p>
                                    <hr
                                      class="divider"
                                      style="width:100%;border:none;border-top:1px solid #eaeaea;padding-bottom:1em;border-width:2px" />
                                    <h2
                                      style="margin:0;padding:0;font-size:1.8em;line-height:1.44em;padding-top:0.389em;font-weight:600;text-align:center">
                                      {{{OTP}}}
                                    </h2>
                                    <table
                                      align="center"
                                      width="100%"
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      role="presentation"
                                      style="margin-top:0;margin-right:auto;margin-bottom:0;margin-left:auto;padding-top:0;padding-right:0;padding-bottom:0;padding-left:0">
                                      <tbody>
                                        <tr
                                          style="margin:0;padding:0;width:100%">
                                          <td
                                            align="center"
                                            data-id="__react-email-column"
                                            style="margin:0;padding:0">
                                            <p
                                              style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                                              <br />
                                            </p>
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
                                <tr style="margin:0;padding:0">
                                  <td
                                    data-id="__react-email-column"
                                    style="margin:0;padding:0">
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
    <!--/$-->
  </body>
</html>

'''
def send_mail(to:str, username:str, subject:str, email_template:str = APPROVED_EMAIL_TEMPLATE, otp:str=None):
    html = email_template
    html = html.replace("{{{USERNAME}}}", username)
    html = html.replace("{{{USER_EMAIL}}}", to)

    if otp:
        html = html.replace("{{OTP}}", otp)
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