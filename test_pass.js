const bcrypt = require('bcrypt');

async function testPassword() {
  const plainPassword1 = 'plain_password1'; // Password you used for testuser1
  const hashedPassword1 = '$2b$10$MudPo85aNy/8Yv4Q27DFqObfxBvNrXDH.AceKuktWthA6zN8661tO'; // Hashed password from DB

  const plainPassword2 = 'plain_password2'; // Password you used for testuser2
  const hashedPassword2 = '$2b$10$ufo9skk7bpKmAGAPtAgBtOEBZiWe25DA8LSU5TqD0IJAuOw2Sc5F6'; // Hashed password from DB

  const match1 = await bcrypt.compare(plainPassword1, hashedPassword1);
  console.log('Password 1 match:', match1);

  const match2 = await bcrypt.compare(plainPassword2, hashedPassword2);
  console.log('Password 2 match:', match2);
}

testPassword();
