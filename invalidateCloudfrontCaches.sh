aws configure set preview.cloudfront true
aws cloudfront create-invalidation --distribution-id E1YBOAFSW1IURN --paths /*