function entityResponse(entity, content) {
  const response = {};
  response[entity] = content;
  return response;
}

exports.entityResponse = entityResponse;
