module.exports = member => {
  let guild = member.guild;
  member.send('Sasinin Huzurundan Ayrıldı');
  guild.defaultChannel.send(``);
};
