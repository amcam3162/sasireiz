const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};


client.on('message', msg => {
  if (msg.content.toLowerCase() === 'hayırsız bot') {
    msg.reply('**SEN BENİM GİBİ MÜKEMMEL BOTA NE DİYERSEN KODUMUN** ');
  }
});

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.on('message', msg => {
  if (msg.content === prefix + 'sasi') {
    msg.reply('ne lo kodumun');
  }
  });

  client.on('message', msg => {
    if (msg.content === prefix + 'sasi sik') {
      msg.reply('dağılın len https://cdn.discordapp.com/attachments/492300803659268097/507985758163042317/897789789789789789.PNG');
    }
    });


    client.on('message', msg => {
      if (msg.content === prefix + 'sütçü sasi') {
        msg.reply('https://cdn.discordapp.com/attachments/492300803659268097/507986353477124117/hfghfchggfh.PNG');
      }
      });

      client.on('message', msg => {
        if (msg.content === prefix + 'abaza sasi') {
          msg.reply('https://cdn.discordapp.com/attachments/492300803659268097/507986721657323545/418418419451451481.PNG');
        }
        });

        client.on('message', msg => {
          if (msg.content === prefix + 'tedirgin sasi') {
            msg.reply('https://cdn.discordapp.com/attachments/492300803659268097/507986993201020938/15615156115615651656561615.PNG');
          }
          });

         client.on('message', msg => {
          if (msg.content === prefix + 'mikrafon sasi') {
            msg.reply('https://cdn.discordapp.com/attachments/492300803659268097/507987524233330699/mikrafon_sasi_2.PNG');
          }
          });

          client.on('message', msg => {
            if (msg.content === prefix + 'tuzla sapığı sasi') {
              msg.reply('https://cdn.discordapp.com/attachments/492300803659268097/507987737543049217/84515641.PNG');
            }
            });

            client.on('message', msg => {
              if (msg.content === prefix + 'kaslı sasi') {
                msg.reply('https://cdn.discordapp.com/attachments/492300803659268097/507988152582144015/kasl_sasi_2.PNG');
              }
              });


                client.on('message', msg => {
                  if (msg.content === prefix + 'mafya sasi') {
                    msg.reply('https://cdn.discordapp.com/attachments/492300803659268097/507994383317204994/mafia_sasi.PNG');
                  }
                  });

client.login(process.env.BOT_TOKEN);
