# 鉴权

1.HTTP Basic Authentication：用的比较少，平常FTP登录是用的这种方式吧？感觉可以用在内部网系统。

2.session-cookie：这个在老的系统见得多，只适用于web系统。以前用java servlet写服务端时候，都会自动维护session，会在cookie写一个JSESSIONID的值。

3.Token：现在主流都是用这个，适用于app鉴权，微信开发平台access token也是差不多这种思路。

4.OAuth：这个是趋势吧，现在想要推广自己的应用都先接入微信 QQ等登录，降低用户使用门槛。特别是微信渠道的手游，都是接入了微信开发授权登录。