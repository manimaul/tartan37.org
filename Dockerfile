FROM manimaul/jacuzzi:0.1.1
COPY dist /web
CMD ["/web"]
