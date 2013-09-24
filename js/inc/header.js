document.write('<div id="m_header">');
document.write('<header class="m_header_content">');
document.write('<input type="button" onclick="logout();" class="btn_logout" id="logout_button" value="Logout">');

document.write('<div><img src="../img/welcome_back.png" style="padding:3px 0px 0px 0px;"><div style="padding:17px 20px 0px 0px;float:right;">');
document.write(sessionStorage["id"]);
document.write('</div></div>');
document.write('</header>');
document.write('</div>');